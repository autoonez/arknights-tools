import { assetUrl } from "../../constants/url";
import { ITEM_DATA_GET } from "../actions";
import { SET_ITEM_DATA } from "../mutations";

export const state = {
  itemDataById: {},
  itemIds: [],
};

export const getters = {
  materialIds(state) {
    return Object.values(state.itemDataById)
      .filter(
        (item) =>
          item.sortId > 0 &&
          item.sortId < 450000 &&
          ["MATERIAL", "GOLD", "CARD_EXP"].includes(item.itemType)
      )
      .map((item) => item.itemId);
  },
  materials(state, getters) {
    return getters.materialIds
      .map((itemId) => state.itemDataById[itemId])
      .sort((a, b) => a.sortId - b.sortId);
  },
};

export const actions = {
  async [ITEM_DATA_GET](context) {
    const data = await (
      await fetch(`${assetUrl}/table/item_table.json`)
    ).json();
    context.commit(SET_ITEM_DATA, data);
  },
};

export const mutations = {
  [SET_ITEM_DATA](state, data) {
    state.itemDataById = data;
    state.itemIds = Object.keys(data);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
