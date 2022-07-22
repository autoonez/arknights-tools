<template>
  <td>
    <v-select
      v-show="type === 'CURRENT'"
      class="table-input"
      :label="skillLabel"
      variant="outlined"
      hideDetails="true"
      density="compact"
      v-model="currentMastery"
      :items="skillMasteryLevels"
    ></v-select>
    <v-select
      v-show="type === 'TARGET'"
      class="table-input"
      :label="skillLabel"
      variant="outlined"
      hideDetails="true"
      density="compact"
      v-model="targetMastery"
      :items="skillMasteryLevels"
    ></v-select>
  </td>
</template>

<script>
import { OPERATOR_PLAN_CHANGE } from "../../store/actions";

export default {
  name: "OperatorTableRowSkillMastery",
  props: ["skill", "index"],
  inject: ["operator", "type", "itemUse"],
  computed: {
    skillLabel() {
      return `Skill ${this.index + 1}`;
    },
    maxMastery() {
      return (
        Object.keys(this.skill.levelUpCostCond)[
          Object.keys(this.skill.levelUpCostCond).length - 1
        ] || 0
      );
    },
    skillMasteryLevels() {
      return [...Array(parseInt(this.maxMastery) + 1).keys()].map((value) => ({
        title: value,
        value: value,
      }));
    },
    currentMastery: {
      get() {
        return this.$store.state.materialPlanner.currentOperator[
          this.operator.id
        ].skillMastery[this.skill.skillId];
      },
      set(value) {
        this.$store.dispatch(OPERATOR_PLAN_CHANGE, {
          operatorId: this.operator.id,
          type: "CURRENT",
          skillMastery: {
            id: this.skill.skillId,
            value,
          },
        });
      },
    },
    targetMastery: {
      get() {
        return this.$store.state.materialPlanner.targetOperator[
          this.operator.id
        ].skillMastery[this.skill.skillId];
      },
      set(value) {
        this.$store.dispatch(OPERATOR_PLAN_CHANGE, {
          operatorId: this.operator.id,
          type: "TARGET",
          skillMastery: {
            id: this.skill.skillId,
            value,
          },
        });
      },
    },
  },
};
</script>
