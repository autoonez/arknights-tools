<template>
  <v-container :style="{ minWidth: '176px' }">
    <div class="d-flex justify-center mb-4">
      <ItemWithNumber
        :itemId="formulaData.itemId"
        :number="formulaData.count * formulaAmount"
      />
    </div>
    <v-text-field
      type="number"
      variant="outlined"
      v-model="formulaAmount"
      :max="itemRequire + formulaAmount"
      :min="0"
      single-line
      hide-details
      class="w-100 mb-4"
    ></v-text-field>
    <div class="material-container">
      <ItemWithNumber
        v-for="(item, index) in costs"
        :key="index"
        :itemId="item.itemId"
        :number="item.count"
      />
    </div>
  </v-container>
</template>

<script>
import ItemWithNumber from "../ItemWithNumber.vue";

export default {
  name: "MaterialFormula",
  props: ["formulaType", "formulaId"],
  emits: ["changeFormula"],
  inject: [
    "craftingFormula",
    "craftingItem",
    "itemRequireFromCharacter",
    "itemRequireFromCrafting",
  ],
  data() {
    return {};
  },
  computed: {
    formulaData() {
      return this.$store.state.itemFormulaDataById[this["formulaType"]][
        this["formulaId"]
      ];
    },
    formulaAmount: {
      get() {
        return (
          this.craftingFormula[this["formulaType"]][this["formulaId"]] || 0
        );
      },
      set(value) {
        this.$emit("changeFormula", {
          formulaType: this.formulaType,
          formulaId: this.formulaId,
          oldValue:
            this.craftingFormula[this["formulaType"]][this["formulaId"]] || 0,
          newValue: value,
        });
      },
    },
    costs() {
      return this.formulaData.costs.map((item) => ({
        itemId: item.id,
        count: item.count * this.formulaAmount,
      }));
    },
    itemRequire() {
      let itemId = this.formulaData.itemId;
      let requireFromCharacter = this.itemRequireFromCharacter[itemId] || 0;
      let requireFromCrafting = this.itemRequireFromCrafting[itemId] || 0;
      let crafting = this.craftingItem[itemId] || 0;
      let current = this.$store.state.materialPlanner.currentItem[itemId] || 0;
      return requireFromCharacter + requireFromCrafting - current - crafting;
    },
  },
  components: { ItemWithNumber },
};
</script>

<style scoped>
.material-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, 48px);
  grid-row-gap: 16px;
  justify-content: center;
}
</style>
