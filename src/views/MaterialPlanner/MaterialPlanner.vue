<template>
  <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
  <template v-if="!loading">
    <v-container>
      <v-expansion-panels v-model="panel" multiple>
        <v-expansion-panel title="Operators" value="OPERATOR">
          <v-expansion-panel-text>
            <OperatorSelectedList
              @selectOperator="selectOperator"
              @openCharacterSelectorDialog="showCharacterSelectorDialog = true"
            />
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel title="Materials" value="ITEM">
          <v-expansion-panel-text>
            <MaterialList />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
      <OperatorDialog
        v-model="showOperatorDialog"
        :id="selectedOperator"
        @set="showOperatorDialog = false"
      />
      <CharacterSelectorDialog
        v-model="showCharacterSelectorDialog"
        :selected="selectedOperatorIds"
        @save="saveSelectedOperatorIds"
      />
    </v-container>
  </template>
</template>

<script>
import OperatorSelectedList from "../../components/MaterialPlanner/OperatorSelectedList.vue";
import OperatorDialog from "../../components/MaterialPlanner/OperatorDialog.vue";
import MaterialList from "../../components/MaterialPlanner/MaterialList.vue";
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
import CharacterSelectorDialog from "../../components/CharacterSelector/CharacterSelectorDialog.vue";
import { mapGetters } from "vuex";
import { computed } from "vue";

export default {
  async created() {
    await this.fetchData();
  },
  data() {
    return {
      loading: true,
      panel: ["OPERATOR", "ITEM"],
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
    OperatorSelectedList,
    OperatorDialog,
    MaterialList,
    CharacterSelectorDialog,
  },
};
</script>
