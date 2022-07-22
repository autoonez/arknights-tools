import { createStore } from "vuex";
import { assetUrl } from "../constants/url";
import {
  EQUIPMENT_DATA_GET,
  ITEM_USE_DATA_GET,
  ITEM_FORMULA_DATA_GET,
  GAME_DATA_GET,
} from "./actions";
import {
  SET_MATERIAL_PLANNER,
  SET_CURRENT_ITEM,
  SET_EQUIPMENT_DATA,
  SET_ITEM_FORMULA_VALUE,
  SET_ITEM_USE_DATA,
  SET_OPERATOR_PLAN,
  SET_ITEM_FORMULA_DATA,
  SET_SELECTED_OPERATOR_IDS,
  SET_GAME_DATA,
  SET_TARGET_OPERATOR_PLANS,
  SET_OPERATOR_PLANS,
} from "./mutations";
import character from "./modules/character";
import item from "./modules/item";
import materialPlanner from "./modules/materialPlanner";

const store = createStore({
  state: {
    gameData: {},
    itemFormulaDataById: {},
    itemUseByCharacterId: {},
    equipmentDataById: {},
  },
  actions: {
    async [GAME_DATA_GET]({ commit }) {
      const data = await (
        await fetch(`${assetUrl}/table/gamedata_const.json`)
      ).json();
      commit(SET_GAME_DATA, data);
    },
    async [ITEM_USE_DATA_GET](context) {
      const data = await (
        await fetch(`${assetUrl}/table/character_item_use_table.json`)
      ).json();
      context.commit(SET_ITEM_USE_DATA, data);
    },
    async [EQUIPMENT_DATA_GET](context) {
      const data = await (
        await fetch(`${assetUrl}/table/equipment_table.json`)
      ).json();
      context.commit(SET_EQUIPMENT_DATA, data);
    },
    async [ITEM_FORMULA_DATA_GET](context) {
      const data = await (
        await fetch(`${assetUrl}/table/item_formula_table.json`)
      ).json();
      context.commit(SET_ITEM_FORMULA_DATA, data);
    },
  },
  mutations: {
    [SET_ITEM_USE_DATA](state, data) {
      state.itemUseByCharacterId = data;
    },
    [SET_EQUIPMENT_DATA](state, data) {
      state.equipmentDataById = data;
    },
    [SET_ITEM_FORMULA_DATA](state, data) {
      state.itemFormulaDataById = data;
    },
    [SET_GAME_DATA](state, data) {
      state.gameData = data;
    },
  },
  modules: {
    character,
    item,
    materialPlanner,
  },
});

store.subscribe((mutation, state) => {
  if (
    [
      SET_MATERIAL_PLANNER,
      SET_SELECTED_OPERATOR_IDS,
      SET_OPERATOR_PLAN,
      SET_OPERATOR_PLANS,
      SET_TARGET_OPERATOR_PLANS,
      SET_CURRENT_ITEM,
      SET_ITEM_FORMULA_VALUE,
    ].includes(mutation.type)
  ) {
    localStorage.setItem(
      "MaterialPlanner",
      JSON.stringify(state.materialPlanner)
    );
  }
});

export default store;
