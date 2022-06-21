<template>
  <v-dialog v-model="show" fullscreen scrollable :scrim="false" class="dialog">
    <v-card>
      <v-toolbar>
        <v-btn icon dark @click="show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="dialog-container">
        <v-card
          v-for="(formulaType, formulaTypeId, index) in formulaMaxAmount"
          :key="index"
          variant="outlined"
          :class="{ 'mt-4': index > 0 }"
          v-show="Object.keys(formulaType).length > 0"
        >
          <v-card-title>{{ formulaTypeId }}</v-card-title>
          <v-card-text>
            <MaterialFormula
              v-for="(max, formulaId, index) in formulaType"
              :key="index"
              :formula-type="formulaTypeId"
              :formula-id="formulaId"
              :max="max"
            />
          </v-card-text>
        </v-card> </v-card-text></v-card
  ></v-dialog>
</template>

<script>
import MaterialFormula from "./MaterialFormula.vue";

export default {
  name: "MaterialCraftingDialog",
  props: ["value"],
  emits: ["set"],
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("set", value);
      },
    },
    formulaMaxAmount() {
      let result = {};
      for (const formulaType of Object.keys(
        this.$store.state.materialPlanner.itemFormula
      )) {
        result[formulaType] = {};

        for (const formulaId of Object.keys(
          this.$store.state.materialPlanner.itemFormula[formulaType]
        )) {
          let formula =
            this.$store.state.itemFormulaDataById[formulaType][formulaId];
          let itemId = formula.itemId;
          let currentItem =
            this.$store.state.materialPlanner.currentItem[itemId];
          let itemRequire = this.$store.getters.itemRequireById[itemId] || 0;
          let formulaRequire =
            this.$store.getters.activeFormula.costs[itemId] || 0;
          let totalRequire = itemRequire + formulaRequire;
          let netRequire =
            totalRequire -
            currentItem -
            (this.$store.getters.activeFormula.item[itemId] || 0);
          result[formulaType][formulaId] = netRequire;
        }
      }
      return result;
    },
  },
  components: { MaterialFormula },
};
</script>
