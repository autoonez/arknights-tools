<template>
  <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
  <template v-if="!loading">
    <MaterialPlannerOperators v-show="panel === 'OPERATOR'" />
    <MaterialPlannerItems v-show="panel === 'ITEM'" :panel="panel" />
    <v-bottom-navigation
      density="compact"
      color="info"
      v-model="panel"
      mandatory
    >
      <v-btn value="OPERATOR"
        ><v-icon class="mr-2">mdi-account</v-icon><span>Operators</span></v-btn
      >
      <v-btn value="ITEM"
        ><v-icon class="mr-2">mdi-package-variant</v-icon
        ><span>Items</span></v-btn
      >
    </v-bottom-navigation>
  </template>
</template>

<script>
import {
  GAME_DATA_GET,
  CHARACTER_DATA_GET,
  EQUIPMENT_DATA_GET,
  ITEM_DATA_GET,
  ITEM_USE_DATA_GET,
  MATERIAL_PLANNER_INIT,
  ITEM_FORMULA_DATA_GET,
  SELECTED_OPERATOR_IDS_CHANGE,
  CHARACTER_CLASS_GET,
} from "../../store/actions";
import { mapGetters } from "vuex";
import { computed } from "vue";
import MaterialPlannerItems from "./MaterialPlannerItems.vue";
import MaterialPlannerOperators from "./MaterialPlannerOperators.vue";

export default {
  async created() {
    await this.fetchData();
  },
  data() {
    return {
      loading: true,
      panel: "OPERATOR",
      selectedOperator: "",
      showOperatorDialog: false,
      showCharacterSelectorDialog: false,
    };
  },
  methods: {
    async fetchData() {
      this.loading = true;
      await Promise.all([
        this.$store.dispatch(GAME_DATA_GET),
        this.$store.dispatch(CHARACTER_DATA_GET),
        this.$store.dispatch(ITEM_DATA_GET),
        this.$store.dispatch(ITEM_USE_DATA_GET),
        this.$store.dispatch(EQUIPMENT_DATA_GET),
        this.$store.dispatch(ITEM_FORMULA_DATA_GET),
        this.$store.dispatch(CHARACTER_CLASS_GET),
      ]);
      await this.$store.dispatch(MATERIAL_PLANNER_INIT);
      this.loading = false;
    },
    selectOperator(id) {
      this.selectedOperator = id;
      this.showOperatorDialog = true;
    },
    saveSelectedOperatorIds(ids) {
      this.$store.dispatch(SELECTED_OPERATOR_IDS_CHANGE, ids);
      this.showCharacterSelectorDialog = false;
    },
  },
  computed: {
    ...mapGetters(["operatorIds"]),
    characterDataById() {
      return this.$store.state.character.characterDataById;
    },
    operators() {
      return this.operatorIds
        .map((operatorId) => this.characterDataById[operatorId])
        .sort(
          (a, b) =>
            b.rarity - a.rarity || a.appellation.localeCompare(b.appellation)
        );
    },
    selectedOperatorIds() {
      return this.$store.state.materialPlanner.selectedOperatorIds;
    },
  },
  watch: {
    TARGET(newTarget) {
      localStorage.setItem(
        "MaterialPlanner",
        JSON.stringify({
          TARGET: newTarget,
          current: this.current,
          currentItem: this.currentItem,
        })
      );
    },
    current(newCurrent) {
      localStorage.setItem(
        "MaterialPlanner",
        JSON.stringify({
          TARGET: this.TARGET,
          current: newCurrent,
          currentItem: this.currentItem,
        })
      );
    },
    currentItem(newCurrentItem) {
      localStorage.setItem(
        "MaterialPlanner",
        JSON.stringify({
          TARGET: this.TARGET,
          current: this.current,
          currentItem: newCurrentItem,
        })
      );
    },
  },
  provide() {
    return {
      operators: computed(() => this.operators),
    };
  },
  components: {
    MaterialPlannerItems,
    MaterialPlannerOperators,
  },
};
</script>
