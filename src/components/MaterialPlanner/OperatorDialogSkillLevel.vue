<template>
  <v-row class="mt-4">
    <v-col cols="12" sm="2">Skill Level</v-col>
    <v-col cols="12" sm="5">
      <p class="d-flex d-sm-none">Current</p>
      <v-slider
        v-model="currentSkillLevel"
        hide-details
        :ticks="skillLevelLabels"
        :min="1"
        :max="maxSkilllevel"
        step="1"
        show-ticks="always"
      ></v-slider>
    </v-col>
    <v-col cols="12" sm="5">
      <p class="d-flex d-sm-none">Target</p>
      <v-slider
        v-model="targetSkillLevel"
        hide-details
        :ticks="skillLevelLabels"
        :min="1"
        :max="maxSkilllevel"
        step="1"
        show-ticks="always"
      ></v-slider
    ></v-col>
  </v-row>
</template>

<script>
import { OPERATOR_PLAN_CHANGE } from "../../store/actions";

export default {
  name: "OperatorDialogSkillLevel",
  props: ["operator-id"],
  data() {
    return {};
  },
  computed: {
    itemUse() {
      return this.$store.state.itemUseByCharacterId[this.operatorId];
    },
    maxSkilllevel() {
      return Object.keys(this.itemUse.allSkillLvlup)[
        Object.keys(Object.keys(this.itemUse.allSkillLvlup)).length - 1
      ];
    },
    skillLevelLabels() {
      return [...Array(parseInt(this.maxSkilllevel)).keys()].reduce(
        (byValue, value) => {
          byValue[value + 1] = parseInt(value) + 1;
          return byValue;
        },
        {}
      );
    },
    currentSkillLevel: {
      get() {
        return this.$store.state.materialPlanner.currentOperator[
          this.operatorId
        ].skillLevel;
      },
      set(value) {
        this.$store.dispatch(OPERATOR_PLAN_CHANGE, {
          operatorId: this.operatorId,
          type: "CURRENT",
          skillLevel: value,
        });
      },
    },
    targetSkillLevel: {
      get() {
        return this.$store.state.materialPlanner.targetOperator[this.operatorId]
          .skillLevel;
      },
      set(value) {
        this.$store.dispatch(OPERATOR_PLAN_CHANGE, {
          operatorId: this.operatorId,
          type: "TARGET",
          skillLevel: value,
        });
      },
    },
  },
};
</script>
