<template>
  <v-dialog v-model="show" fullscreen scrollable class="dialog">
    <v-card>
      <v-toolbar>
        <v-btn icon dark @click="show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn></v-toolbar
      >
      <div class="dialog-container">
        <v-img :src="imgSrc" width="86px" class="ma-auto"></v-img>
        <v-row class="mt-4">
          <v-col cols="12" sm="6">
            <v-card variant="outlined" class="pa-4 text-center h-100">
              <v-row>
                <v-col cols="6"
                  ><p>Item Require</p>
                  <p>{{ itemRequire }}</p></v-col
                >
                <v-col cols="6"
                  ><p>Crafting Require</p>
                  <p>{{ formulaRequire }}</p></v-col
                >
              </v-row>
              <p>Total Require</p>
              <p>{{ totalRequire }}</p>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card
              variant="outlined"
              class="pa-4 text-center h-100 d-flex flex-column"
            >
              <p>Current</p>
              <v-spacer></v-spacer>
              <v-card variant="outlined">
                <input
                  type="number"
                  min="0"
                  class="font-color-theme pa-2 text-center w-100"
                  v-model="currentItem"
                />
              </v-card>
            </v-card>
          </v-col>
        </v-row>
        <v-card variant="outlined" class="pa-4 mt-4 text-center">
          <p class="text-center">Still Require</p>
          <p>{{ netRequire }}</p>
        </v-card>
        <MaterialFormula
          v-for="(formula, index) in material.buildingProductList"
          :key="index"
          :formula-type="formula.roomType"
          :formula-id="formula.formulaId"
          :max="netRequire"
        ></MaterialFormula>
      </div> </v-card
  ></v-dialog>
</template>

<script>
import { assetUrl } from "../../constants/url";
import { CURRENT_ITEM_CHANGE } from "../../store/actions";
import MaterialFormula from "./MaterialFormula.vue";

export default {
  name: "MaterialDialog",
  props: ["itemId", "value"],
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
    material() {
      return this.$store.state.item.itemDataById[this.itemId];
    },
    imgSrc() {
      return `${assetUrl}/images/items/${this.material.iconId}.png`;
    },
    itemRequire() {
      return this.$store.getters.itemRequireById[this.itemId] || 0;
    },
    formulaRequire() {
      return this.$store.getters.activeFormula.costs[this.itemId] || 0;
    },
    totalRequire() {
      return this.itemRequire + this.formulaRequire;
    },
    netRequire() {
      return (
        this.totalRequire -
        this.currentItem -
        (this.$store.getters.activeFormula.item[this.itemId] || 0)
      );
    },
    currentItem: {
      get() {
        return this.$store.state.materialPlanner.currentItem[this.itemId] || 0;
      },
      set(value) {
        this.$store.dispatch(CURRENT_ITEM_CHANGE, {
          itemId: this.itemId,
          value,
        });
      },
    },
  },
  components: { MaterialFormula },
};
</script>

<style>
.font-color-theme {
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
}
</style>
