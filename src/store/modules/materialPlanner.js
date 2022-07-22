import {
  ITEM_FORMULA_CHANGE,
  CURRENT_ITEM_CHANGE,
  MATERIAL_PLANNER_INIT,
  OPERATOR_PLAN_CHANGE,
  SELECTED_OPERATOR_IDS_CHANGE,
  OPERATOR_PLAN_SET_TARGET_TO_MAX,
  OPERATOR_PLAN_SET_TARGET_EQUAL_CURRENT,
  SELECTED_OPERATOR_TOGGLE,
  OPERATOR_PLAN_SET,
  OPERATOR_PLANS_SET,
} from "../actions";
import {
  SET_MATERIAL_PLANNER,
  SET_CURRENT_ITEM,
  SET_ITEM_FORMULA_VALUE,
  SET_OPERATOR_PLAN,
  SET_SELECTED_OPERATOR_IDS,
  SET_TARGET_OPERATOR_PLANS,
  SET_OPERATOR_PLANS,
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
          sessionData.currentOperator[operatorId] = Object.assign(
            {},
            operatorPlan
          );
          sessionData.targetOperator[operatorId] = Object.assign(
            {},
            operatorPlan
          );
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
        currentOperator[operatorId] = Object.assign({}, operatorPlan);
        targetOperator[operatorId] = Object.assign({}, operatorPlan);
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
    let current = JSON.parse(JSON.stringify(state.currentOperator[operatorId]));
    let target = JSON.parse(JSON.stringify(state.targetOperator[operatorId]));

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
      if (parseInt(masteryLevel) > 0) {
        if (current.skillLevel < 7) {
          current.skillLevel = 7;
        }
        if (parseInt(current.phase) < 2) {
          current.phase = 2;
          current.level = 1;
        }
        break;
      }
    }
    for (const masteryLevel of Object.values(target.skillMastery)) {
      if (parseInt(masteryLevel) > 0) {
        if (target.skillLevel < 7) {
          target.skillLevel = 7;
        }
        if (parseInt(target.phase) < 2) {
          target.phase = 2;
          target.level = 1;
        }
        break;
      }
    }

    for (const [equipmentId, equipmentLevel] of Object.entries(
      current.modules
    )) {
      let equipment = rootState.equipmentDataById[equipmentId];
      if (equipmentLevel > 0 && current.phase <= equipment.unlockEvolvePhase) {
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
      if (equipmentLevel > 0 && target.phase <= equipment.unlockEvolvePhase) {
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
  [SELECTED_OPERATOR_TOGGLE]({ commit, state }, operatorId) {
    let selectedOperatorIds = [...state.selectedOperatorIds];
    if (selectedOperatorIds.includes(operatorId)) {
      selectedOperatorIds = selectedOperatorIds.filter(
        (id) => id !== operatorId
      );
    } else {
      selectedOperatorIds.push(operatorId);
    }
    commit(SET_SELECTED_OPERATOR_IDS, selectedOperatorIds);
  },
  [OPERATOR_PLAN_SET_TARGET_TO_MAX]({ commit, getters, rootGetters }) {
    let targetOperator = {};
    let selectedOperatorIds = [];
    for (const operatorId of rootGetters.operatorIds) {
      let operatorPlan = getters.getOperatorPlan({
        operatorId,
        TARGET: "MAX",
      });
      targetOperator[operatorId] = Object.assign({}, operatorPlan);
      selectedOperatorIds.push(operatorId);
    }
    commit(SET_SELECTED_OPERATOR_IDS, selectedOperatorIds);
    commit(SET_TARGET_OPERATOR_PLANS, targetOperator);
  },
  [OPERATOR_PLAN_SET_TARGET_EQUAL_CURRENT]({ commit, state }) {
    let targetOperator = {};
    for (const operatorId of state.selectedOperatorIds) {
      targetOperator[operatorId] = Object.assign(
        {},
        state.currentOperator[operatorId]
      );
    }
    commit(SET_TARGET_OPERATOR_PLANS, targetOperator);
  },
  [OPERATOR_PLAN_SET]({ commit, getters, state }, { operatorId, type, value }) {
    let current = JSON.parse(JSON.stringify(state.currentOperator[operatorId]));
    let target = JSON.parse(JSON.stringify(state.targetOperator[operatorId]));
    if (type === "CURRENT") {
      if (value === "MAX") {
        let plan = getters.getOperatorPlan({
          operatorId,
          TARGET: "MAX",
        });
        current = Object.assign({}, plan);
        target = Object.assign({}, plan);
      } else if (value === "MIN") {
        current = Object.assign(
          {},
          getters.getOperatorPlan({
            operatorId,
            TARGET: "MIN",
          })
        );
      }
    } else if (type === "TARGET") {
      if (value === "MIN") {
        target = Object.assign({}, current);
      } else if (value === "MAX") {
        target = Object.assign(
          {},
          getters.getOperatorPlan({
            operatorId,
            TARGET: "MAX",
          })
        );
      }
    }
    commit(SET_OPERATOR_PLAN, { operatorId, current, target });
  },
  [OPERATOR_PLANS_SET](
    { commit, getters, state },
    { operatorIds, type, value }
  ) {
    let current = JSON.parse(JSON.stringify(state.currentOperator));
    let target = JSON.parse(JSON.stringify(state.targetOperator));
    for (const operatorId of operatorIds) {
      if (type === "CURRENT") {
        if (value === "MAX") {
          let plan = getters.getOperatorPlan({
            operatorId,
            TARGET: "MAX",
          });
          current[operatorId] = Object.assign({}, plan);
          target[operatorId] = Object.assign({}, plan);
        } else if (value === "MIN") {
          current[operatorId] = Object.assign(
            {},
            getters.getOperatorPlan({
              operatorId,
              TARGET: "MIN",
            })
          );
        }
      } else if (type === "TARGET") {
        if (value === "MIN") {
          target[operatorId] = Object.assign({}, current);
        } else if (value === "MAX") {
          target[operatorId] = Object.assign(
            {},
            getters.getOperatorPlan({
              operatorId,
              TARGET: "MAX",
            })
          );
        }
      }
      commit(SET_OPERATOR_PLANS, { current, target });
    }
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
  [SET_OPERATOR_PLANS](state, { current, target }) {
    state.currentOperator = current;
    state.targetOperator = target;
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
