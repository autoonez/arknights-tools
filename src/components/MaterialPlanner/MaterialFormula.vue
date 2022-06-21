<template>
  <v-card variant="outlined" class="mt-4 pa-4">
    <v-row>
      <v-col cols="12" sm="4">
        <v-card variant="outlined" class="d-flex flex-wrap justify-center">
          <ItemWithNumber
            :itemId="formulaData.itemId"
            :number="formulaData.count * formulaAmount"
          />
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          type="number"
          v-model="formulaAmount"
          :max="max + formulaAmount"
          :min="0"
          hide-details
          class="w-100"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card variant="outlined" class="d-flex flex-wrap justify-center">
          <ItemWithNumber
            v-for="(item, index) in costs"
            :key="index"
            :itemId="item.itemId"
            :number="item.count"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { ITEM_FORMULA_CHANGE } from "../../store/actions";
import ItemWithNumber from "./ItemWithNumber.vue";

export default {
  name: "MaterialFormula",
  props: ["formulaType", "formulaId", "max"],
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
          this.$store.state.materialPlanner.itemFormula[this["formulaType"]][
            this["formulaId"]
          ] || 0
        );
      },
      set(value) {
        this.$store.dispatch(ITEM_FORMULA_CHANGE, {
          formulaId: this["formulaId"],
          formulaType: this["formulaType"],
          value,
        });
      },
    },
    costs() {
      return this.formulaData.costs.map((item) => ({
        itemId: item.id,
        count: item.count * this.formulaAmount,
      }));
    },
  },
  components: { ItemWithNumber },
};
</script>
