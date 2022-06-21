import {
  ITEM_FORMULA_CHANGE,
  CURRENT_ITEM_CHANGE,
  MATERIAL_PLANNER_INIT,
  OPERATOR_PLAN_CHANGE,
  SELECTED_OPERATOR_IDS_CHANGE,
  OPERATOR_PLAN_SET_TARGET_TO_MAX,
  OPERATOR_PLAN_SET_TARGET_EQUAL_CURRENT,
} from "../actions";
import {
  SET_MATERIAL_PLANNER,
  SET_CURRENT_ITEM,
  SET_ITEM_FORMULA_VALUE,
  SET_OPERATOR_PLAN,
  SET_SELECTED_OPERATOR_IDS,
  SET_TARGET_OPERATOR_PLANS,
} from "../mutations";

export const state = {
  currentOperator: {},
  targetOperator: {},
  selectedOperatorIds: [],
  currentItem: {},
  itemFormula: {
    WORKSHOP: {},
    MANUFACTURE: {},
  },
};

export const getters = {
  getOperatorPlan:
    (state, getters, rootState) =>
    ({ operatorId, TARGET }) => {
      let operator = rootState.character.characterDataById[operatorId];
      let gamedata = rootState.gameData;
      let { allSkillLvlup, skills, phases, modules } =
        rootState.itemUseByCharacterId[operatorId];
      let skillLevel =
        TARGET === "MAX"
          ? Object.keys(allSkillLvlup)[Object.keys(allSkillLvlup).length - 1]
          : 1;
      let skillMastery = Object.values(skills).reduce(
        (skillById, skillDetail) => {
          let { levelUpCostCond } = skillDetail;
          skillById[skillDetail.skillId] =
            TARGET === "MAX"
              ? Object.keys(levelUpCostCond)[
                  Object.keys(levelUpCostCond).length - 1
                ]
              : 0;
          return skillById;
        },
        {}
      );
      let tempModules = Object.entries(modules).reduce((byId, [id, detail]) => {
        let maxLevel =
          Object.keys(detail).length > 0
            ? Object.keys(detail)[Object.keys(detail).length - 1]
            : 0;
        byId[id] = TARGET === "MAX" ? maxLevel : 0;
        return byId;
      }, {});
      let phase =
        TARGET === "MAX"
          ? Object.keys(phases)[Object.keys(phases).length - 1]
          : 0;
      let level =
        TARGET === "MAX" ? gamedata.maxLevel[operator.rarity][phase] : 1;
      return {
        skillLevel,
        skillMastery,
        phase,
        modules: tempModules,
        level,
      };
    },
  itemRequireById(state, getters, rootState) {
    let itemRequire = {
      itemRequireById: {
        //itemId 4001 = LMD
        4001: 0,
      },
      addItemSet(itemSet = {}) {
        for (const [itemId, count] of Object.entries(itemSet)) {
          if (!(itemId in this.itemRequireById)) {
            this.itemRequireById[itemId] = 0;
          }
          this.itemRequireById[itemId] += count;
        }
      },
      removeItemSet(itemSet = {}) {
        for (const [itemId, count] of Object.entries(itemSet)) {
          if (itemId in this.itemRequireById) {
            this.itemRequireById[itemId] -= count;
          }
        }
      },
    };
    let gameData = rootState.gameData;
    let getExpItemRequire = (totalExp) => {
      let expItems = Object.values(gameData.expItems).sort(
        (a, b) => b.gainExp - a.gainExp
      );
      let result = expItems.reduce((byId, item) => {
        byId[item.id] = 0;
        return byId;
      }, {});
      for (const [index, item] of expItems.entries()) {
        if (totalExp / item.gainExp > 0) {
          let count = Math.floor(totalExp / item.gainExp);
          result[item.id] += count;
          totalExp -= item.gainExp * count;
        } else if (totalExp > 0 && index === expItems.length - 1) {
          result[item.id] += 1;
        }
      }
      return result;
    };
    for (const operatorId of state.selectedOperatorIds) {
      let data = rootState.itemUseByCharacterId[operatorId];
      let operator = rootState.character.characterDataById[operatorId];
      let current = state.currentOperator[operatorId];
      let target = state.targetOperator[operatorId];

      //phase
      if (target.phase > 0) {
        itemRequire.addItemSet(data.phases[target.phase]);
      }
      if (current.phase > 0) {
        itemRequire.removeItemSet(data.phases[current.phase]);
      }
      let phaseDiff = target.phase - current.parse;
      if (phaseDiff > 0) {
        let evolveGoldCost = gameData.evolveGoldCost[operator.rarity];
        itemRequire.addItemSet({
          4001: evolveGoldCost
            .reverse()
            .slice(0, phaseDiff)
            .reduce((sum, cost) => (sum += cost), 0),
        });
      }

      //level
      for (let phase = current.phase; phase <= target.phase; phase++) {
        let maxLevel = gameData.maxLevel[operator.rarity][phase];
        let currentLevel = phase === target.phase ? current.level : 1;
        let targetLevel = phase === target.phase ? target.level : maxLevel;
        if (targetLevel - currentLevel > 0) {
          let characterUpgradeCostMap = gameData.characterUpgradeCostMap[phase];
          let characterExpMap = gameData.characterExpMap[phase];
          //lmd
          itemRequire.addItemSet({
            4001: characterUpgradeCostMap
              .slice(currentLevel - 1, targetLevel - 1)
              .reduce((sum, cost) => (sum += cost), 0),
          });

          //exp
          let totalExp = characterExpMap
            .slice(currentLevel - 1, targetLevel - 1)
            .reduce((sum, exp) => (sum += exp), 0);
          itemRequire.addItemSet(getExpItemRequire(totalExp));
        }
      }

      //skillLevel
      itemRequire.addItemSet(data.allSkillLvlup[target.skillLevel]);
      itemRequire.removeItemSet(data.allSkillLvlup[current.skillLevel]);

      //skillMastery
      for (const skillId of Object.keys(data.skills)) {
        if (target.skillMastery[skillId] > 0) {
          itemRequire.addItemSet(
            data.skills[skillId].levelUpCostCond[target.skillMastery[skillId]]
          );
        }
        if (current.skillMastery[skillId] > 0) {
          itemRequire.removeItemSet(
            data.skills[skillId].levelUpCostCond[current.skillMastery[skillId]]
          );
        }
      }

      //equipment
      for (const equipmentId of Object.keys(data.modules)) {
        if (target.modules[equipmentId] > 0) {
          itemRequire.addItemSet(
            data.modules[equipmentId][target.modules[equipmentId]]
          );
        }
        if (current.modules[equipmentId] > 0) {
          itemRequire.removeItemSet(
            data.modules[equipmentId][current.modules[equipmentId]]
          );
        }
      }
    }
    return itemRequire.itemRequireById;
  },
  activeFormula(state, getters, rootState) {
    //itemId 4001 = LMD
    let item = {};
    let costs = {
      4001: 0,
    };
    for (const formulaType in state.itemFormula) {
      for (const [formulaId, value] of Object.entries(
        state.itemFormula[formulaType]
      )) {
        if (value > 0) {
          let formula = rootState.itemFormulaDataById[formulaType][formulaId];
          if (!(formula.itemId in item)) {
            item[formula.itemId] = 0;
          }
          item[formula.itemId] += value * formula.count;
          costs[4001] += formula.goldCost * value;
          for (const item of formula.costs) {
            if (!(item.id in costs)) {
              costs[item.id] = 0;
            }
            costs[item.id] += value * item.count;
          }
        }
      }
    }
    // for (const [formulaId, value] of Object.entries(state.formula)) {
    //   if (value > 0) {
    //     let formula = rootState.workshopFormulaDataById[formulaId];
    //     if (!(formula.itemId in item)) {
    //       item[formula.itemId] = 0;
    //     }
    //     item[formula.itemId] += value * formula.count;
    //     costs[4001] += formula.goldCost * value;
    //     for (const item of formula.costs) {
    //       if (!(item.id in costs)) {
    //         costs[item.id] = 0;
    //       }
    //       costs[item.id] += value * item.count;
    //     }
    //   }
    // }
    return { item, costs };
  },
};

export const actions = {
  [MATERIAL_PLANNER_INIT]({ commit, getters, rootGetters }) {
    let sessionData = localStorage.getItem("MaterialPlanner");
    if (sessionData) {
      sessionData = JSON.parse(sessionData);
      for (const operatorId of rootGetters.operatorIds) {
        if (!Object.keys(sessionData.currentOperator).includes(operatorId)) {
          let operatorPlan = getters.getOperatorPlan({
            operatorId,
            TARGET: "MIN",
          });
          sessionData.currentOperator[operatorId] = { ...operatorPlan };
          sessionData.targetOperator[operatorId] = { ...operatorPlan };
        }
      }
      commit(SET_MATERIAL_PLANNER, sessionData);
    } else {
      let currentOperator = {};
      let targetOperator = {};
      for (const operatorId of rootGetters.operatorIds) {
        let operatorPlan = getters.getOperatorPlan({
          operatorId,
          TARGET: "MIN",
        });
        currentOperator[operatorId] = { ...operatorPlan };
        targetOperator[operatorId] = { ...operatorPlan };
      }
      commit(SET_MATERIAL_PLANNER, {
        currentOperator,
        targetOperator,
      });
    }
  },
  [OPERATOR_PLAN_CHANGE](
    { commit, state, rootState },
    { operatorId, type, phase, level, skillLevel, skillMastery, modules }
  ) {
    let current = { ...state.currentOperator[operatorId] };
    let target = { ...state.targetOperator[operatorId] };

    if (parseInt(phase) >= 0) {
      let operator = rootState.character.characterDataById[operatorId];
      let newMaxLevel = rootState.gameData.maxLevel[operator.rarity][phase];

      if (type === "CURRENT") {
        if (parseInt(phase) > current.phase) {
          current.level = 1;
        }
        if (parseInt(phase) < current.phase) {
          current.level = newMaxLevel;
        }

        current.phase = phase;
        if (parseInt(phase) > parseInt(target.phase)) {
          target.phase = phase;
          target.level = 1;
        }
      } else {
        if (parseInt(phase) > target.phase) {
          target.level = 1;
        }
        if (parseInt(phase) < target.phase) {
          target.level = newMaxLevel;
        }
        target.phase = phase;
      }
    }
    if (level) {
      if (type === "CURRENT") {
        current.level = level;
        if (level > target.level && current.phase >= target.phase) {
          target.level = level;
        }
      } else {
        target.level = level;
      }
    }
    if (skillLevel) {
      if (type === "CURRENT") {
        current.skillLevel = skillLevel;

        if (skillLevel > target.skillLevel) {
          target.skillLevel = skillLevel;
        }
      } else {
        target.skillLevel = skillLevel;
      }
    }
    if (skillMastery) {
      const { id, value } = skillMastery;
      if (type === "CURRENT") {
        current.skillMastery[id] = value;

        if (parseInt(value) > parseInt(target.skillMastery[id])) {
          target.skillMastery[id] = value;
        }
      } else {
        target.skillMastery[id] = value;
      }
    }
    if (modules) {
      const { id, value } = modules;
      if (type === "CURRENT") {
        current.modules[id] = value;

        if (parseInt(value) > parseInt(target.modules[id])) {
          target.modules[id] = value;
        }
      } else {
        target.modules[id] = value;
      }
    }

    if (current.phase === 0 && current.skillLevel > 4) {
      current.phase = 1;
      current.level = 1;
    }
    if (target.phase === 0 && target.skillLevel > 4) {
      target.phase = 1;
      target.level = 1;
    }

    for (const masteryLevel of Object.values(current.skillMastery)) {
      if (parseInt(masteryLevel) > 0 && parseInt(current.phase) < 2) {
        current.skillLevel = 7;
        current.phase = 2;
        current.level = 1;
        break;
      }
    }
    for (const masteryLevel of Object.values(target.skillMastery)) {
      if (parseInt(masteryLevel) > 0 && parseInt(target.phase) < 2) {
        target.skillLevel = 7;
        target.phase = 2;
        target.level = 1;
        break;
      }
    }

    for (const [equipmentId, equipmentLevel] of Object.entries(
      current.modules
    )) {
      let equipment = rootState.equipmentDataById[equipmentId];
      if (equipmentLevel > 0 && current.phase < equipment.unlockEvolvePhase) {
        current.phase = equipment.unlockEvolvePhase;
        if (current.level < equipment.unlockLevel) {
          current.level = equipment.unlockLevel;
        }
      }
    }
    for (const [equipmentId, equipmentLevel] of Object.entries(
      target.modules
    )) {
      let equipment = rootState.equipmentDataById[equipmentId];
      if (equipmentLevel > 0 && target.phase < equipment.unlockEvolvePhase) {
        target.phase = equipment.unlockEvolvePhase;
        if (target.level < equipment.unlockLevel) {
          target.level = equipment.unlockLevel;
        }
      }
    }

    commit(SET_OPERATOR_PLAN, { operatorId, current, target });
  },
  [CURRENT_ITEM_CHANGE]({ commit }, { itemId, value }) {
    commit(SET_CURRENT_ITEM, { itemId, value });
  },
  [ITEM_FORMULA_CHANGE]({ commit }, { formulaId, formulaType, value }) {
    commit(SET_ITEM_FORMULA_VALUE, { formulaId, formulaType, value });
  },
  [SELECTED_OPERATOR_IDS_CHANGE]({ commit }, ids) {
    commit(SET_SELECTED_OPERATOR_IDS, ids);
  },
  [OPERATOR_PLAN_SET_TARGET_TO_MAX]({ commit, getters, rootGetters }) {
    let targetOperator = {};
    let selectedOperatorIds = [];
    for (const operatorId of rootGetters.operatorIds) {
      let operatorPlan = getters.getOperatorPlan({
        operatorId,
        TARGET: "MAX",
      });
      targetOperator[operatorId] = { ...operatorPlan };
      selectedOperatorIds.push(operatorId);
    }
    commit(SET_SELECTED_OPERATOR_IDS, selectedOperatorIds);
    commit(SET_TARGET_OPERATOR_PLANS, targetOperator);
  },
  [OPERATOR_PLAN_SET_TARGET_EQUAL_CURRENT]({ commit, state }) {
    let targetOperator = {};
    for (const operatorId of state.selectedOperatorIds) {
      targetOperator[operatorId] = { ...state.currentOperator[operatorId] };
    }
    commit(SET_TARGET_OPERATOR_PLANS, targetOperator);
  },
};

export const mutations = {
  [SET_MATERIAL_PLANNER](
    state,
    {
      currentOperator = {},
      targetOperator = {},
      selectedOperatorIds = [],
      currentItem = {},
      itemFormula = {
        WORKSHOP: {},
        MANUFACTURE: {},
      },
    }
  ) {
    state.currentOperator = currentOperator;
    state.targetOperator = targetOperator;
    state.selectedOperatorIds = selectedOperatorIds;
    state.currentItem = currentItem;
    state.itemFormula = itemFormula;
  },
  [SET_SELECTED_OPERATOR_IDS](state, ids) {
    state.selectedOperatorIds = ids;
  },
  [SET_OPERATOR_PLAN](state, { operatorId, current, target }) {
    state.currentOperator[operatorId] = current;
    state.targetOperator[operatorId] = target;
  },
  [SET_CURRENT_ITEM](state, { itemId, value }) {
    state.currentItem[itemId] = value;
  },
  [SET_ITEM_FORMULA_VALUE](state, { formulaId, formulaType, value }) {
    state.itemFormula[formulaType][formulaId] = value;
  },
  [SET_TARGET_OPERATOR_PLANS](state, targetOperator) {
    state.targetOperator = targetOperator;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
