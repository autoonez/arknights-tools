import { assetUrl } from "../../constants/url";
import { CHARACTER_CLASS_GET, CHARACTER_DATA_GET } from "../actions";
import { SET_CHARACTER_CLASS, SET_CHARACTER_DATA } from "../mutations";

export const state = {
  characterDataById: {},
  characterIds: [],
  characterClassById: {},
};

export const getters = {
  operatorIds(state) {
    return Object.values(state.characterDataById)
      .filter(
        (char) =>
          !char.isNotObtainable && !["TOKEN", "TRAP"].includes(char.profession)
      )
      .map((char) => char.id);
  },
  operatorClasses(state) {
    return Object.values(state.characterClassById).filter(
      (charClass) => !["TOKEN", "TRAP"].includes(charClass.classId)
    );
  },
};

export const actions = {
  async [CHARACTER_DATA_GET](context) {
    const data = await (
      await fetch(`${assetUrl}/table/character_table.json`)
    ).json();
    context.commit(SET_CHARACTER_DATA, data);
  },
  async [CHARACTER_CLASS_GET]({ commit }) {
    const data = await (
      await fetch(`${assetUrl}/table/character_class_table.json`)
    ).json();
    commit(SET_CHARACTER_CLASS, data);
  },
};

export const mutations = {
  [SET_CHARACTER_DATA](state, data) {
    state.characterDataById = data;
    state.characterIds = Object.keys(data);
  },
  [SET_CHARACTER_CLASS](state, data) {
    state.characterClassById = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
