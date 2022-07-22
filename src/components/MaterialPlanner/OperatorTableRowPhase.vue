<template>
  <td>
    <v-select
      v-show="type === 'CURRENT'"
      class="table-input"
      label="Promotion"
      variant="outlined"
      hideDetails="true"
      density="compact"
      v-model="currentPhase"
      :items="characterPhases"
    ></v-select>
    <v-select
      v-show="type === 'TARGET'"
      class="table-input"
      label="Promotion"
      variant="outlined"
      hideDetails="true"
      density="compact"
      v-model="targetPhase"
      :items="characterPhases"
    ></v-select>
  </td>
</template>

<script>
import { OPERATOR_PLAN_CHANGE } from "../../store/actions";

export default {
  name: "OperatorTableRowPhase",
  inject: ["operator", "type", "itemUse"],
  computed: {
    maxPhase() {
      return Object.keys(this.itemUse.phases)[
        Object.keys(this.itemUse.phases).length - 1
      ];
    },
    characterPhases() {
      return [...Array(parseInt(this.maxPhase) + 1).keys()].map((value) => ({
        title: `Elite ${value}`,
        value,
      }));
    },
    currentPhase: {
      get() {
        return this.$store.state.materialPlanner.currentOperator[
          this.operator.id
        ].phase;
      },
      set(value) {
        this.$store.dispatch(OPERATOR_PLAN_CHANGE, {
          operatorId: this.operator.id,
          type: "CURRENT",
          phase: value,
        });
      },
    },
    targetPhase: {
      get() {
        return this.$store.state.materialPlanner.targetOperator[
          this.operator.id
        ].phase;
      },
      set(value) {
        this.$store.dispatch(OPERATOR_PLAN_CHANGE, {
          operatorId: this.operator.id,
          type: "TARGET",
          phase: value,
        });
      },
    },
  },
};
</script>
