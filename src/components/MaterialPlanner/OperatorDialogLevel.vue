<template>
  <v-row class="mt-0 mt-sm-4">
    <v-col cols="12" sm="2">Level</v-col>
    <v-col cols="12" sm="5">
      <v-text-field
        label="Current"
        type="number"
        v-model="currentLevel"
        :max="maxCurrentLevel"
        :min="1"
        hide-details
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="5">
      <v-text-field
        label="Target"
        type="number"
        v-model="targetLevel"
        :max="maxTargetLevel"
        :min="1"
        hide-details
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
import { OPERATOR_PLAN_CHANGE } from "../../store/actions";

export default {
  name: "OperatorDialogLevel",
  props: ["operator-id"],
  data() {
    return {};
  },
  computed: {
    operator() {
      return this.$store.state.character.characterDataById[this.operatorId];
    },
    maxLevel() {
      return this.$store.state.gameData.maxLevel;
    },
    maxCurrentLevel() {
      let currentPhase =
        this.$store.state.materialPlanner.currentOperator[this.operatorId]
          .phase;
      return this.maxLevel[this.operator.rarity][currentPhase];
    },
    maxTargetLevel() {
      let targetPhase =
        this.$store.state.materialPlanner.targetOperator[this.operatorId].phase;
      return this.maxLevel[this.operator.rarity][targetPhase];
    },
    currentLevel: {
      get() {
        return this.$store.state.materialPlanner.currentOperator[
          this.operatorId
        ].level;
      },
      set(value) {
        this.$store.dispatch(OPERATOR_PLAN_CHANGE, {
          operatorId: this.operatorId,
          type: "CURRENT",
          level: value,
        });
      },
    },
    targetLevel: {
      get() {
        return this.$store.state.materialPlanner.targetOperator[this.operatorId]
          .level;
      },
      set(value) {
        this.$store.dispatch(OPERATOR_PLAN_CHANGE, {
          operatorId: this.operatorId,
          type: "TARGET",
          level: value,
        });
      },
    },
  },
};
</script>
