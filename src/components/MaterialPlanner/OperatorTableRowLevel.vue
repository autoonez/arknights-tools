<template>
  <td>
    <v-text-field
      v-show="type === 'CURRENT'"
      class="table-input"
      variant="outlined"
      density="compact"
      label="Level"
      type="number"
      v-model="currentLevel"
      :max="maxCurrentLevel"
      :min="1"
      hide-details
    ></v-text-field>
    <v-text-field
      v-show="type === 'TARGET'"
      class="table-input"
      variant="outlined"
      density="compact"
      label="Level"
      type="number"
      v-model="targetLevel"
      :max="maxTargetLevel"
      :min="1"
      hide-details
    ></v-text-field>
  </td>
</template>

<script>
import { OPERATOR_PLAN_CHANGE } from "../../store/actions";

export default {
  name: "OperatorTableRowLevel",
  inject: ["operator", "type", "itemUse"],
  computed: {
    maxLevel() {
      return this.$store.state.gameData.maxLevel;
    },
    maxCurrentLevel() {
      let currentPhase =
        this.$store.state.materialPlanner.currentOperator[this.operator.id]
          .phase;
      return this.maxLevel[this.operator.rarity][currentPhase];
    },
    maxTargetLevel() {
      let targetPhase =
        this.$store.state.materialPlanner.targetOperator[this.operator.id]
          .phase;
      return this.maxLevel[this.operator.rarity][targetPhase];
    },
    currentLevel: {
      get() {
        return this.$store.state.materialPlanner.currentOperator[
          this.operator.id
        ].level;
      },
      set(value) {
        this.$store.dispatch(OPERATOR_PLAN_CHANGE, {
          operatorId: this.operator.id,
          type: "CURRENT",
          level: value,
        });
      },
    },
    targetLevel: {
      get() {
        return this.$store.state.materialPlanner.targetOperator[
          this.operator.id
        ].level;
      },
      set(value) {
        this.$store.dispatch(OPERATOR_PLAN_CHANGE, {
          operatorId: this.operator.id,
          type: "TARGET",
          level: value,
        });
      },
    },
  },
};
</script>
