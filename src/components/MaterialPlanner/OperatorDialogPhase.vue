<template>
  <v-row class="mt-0 mt-sm-4">
    <v-col cols="12" sm="2">Promotion</v-col>
    <v-col cols="12" sm="5">
      <p class="d-flex d-sm-none">Current</p>
      <v-slider
        v-model="currentPhase"
        hide-details
        :ticks="phaseLabels"
        :max="maxPhase"
        step="1"
        show-ticks="always"
      ></v-slider>
    </v-col>
    <v-col cols="12" sm="5">
      <p class="d-flex d-sm-none">Target</p>
      <v-slider
        v-model="targetPhase"
        hide-details
        :ticks="phaseLabels"
        :max="maxPhase"
        step="1"
        show-ticks="always"
      ></v-slider
    ></v-col>
  </v-row>
</template>

<script>
import { OPERATOR_PLAN_CHANGE } from "../../store/actions";

export default {
  name: "OperatorDialogPhase",
  props: ["operator-id"],
  data() {
    return {};
  },
  computed: {
    itemUse() {
      return this.$store.state.itemUseByCharacterId[this.operatorId];
    },
    maxPhase() {
      return Object.keys(this.itemUse.phases)[
        Object.keys(this.itemUse.phases).length - 1
      ];
    },
    phaseLabels() {
      return [...Array(parseInt(this.maxPhase) + 1).keys()].reduce(
        (byValue, value) => {
          byValue[value] = `Elite ${value}`;
          return byValue;
        },
        {}
      );
    },
    currentPhase: {
      get() {
        return this.$store.state.materialPlanner.currentOperator[
          this.operatorId
        ].phase;
      },
      set(value) {
        this.$store.dispatch(OPERATOR_PLAN_CHANGE, {
          operatorId: this.operatorId,
          type: "CURRENT",
          phase: value,
        });
      },
    },
    targetPhase: {
      get() {
        return this.$store.state.materialPlanner.targetOperator[this.operatorId]
          .phase;
      },
      set(value) {
        this.$store.dispatch(OPERATOR_PLAN_CHANGE, {
          operatorId: this.operatorId,
          type: "TARGET",
          phase: value,
        });
      },
    },
  },
};
</script>
