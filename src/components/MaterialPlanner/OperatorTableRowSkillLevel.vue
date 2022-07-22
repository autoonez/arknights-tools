<template>
  <td>
    <v-select
      v-show="type === 'CURRENT'"
      class="table-input"
      label="Skill Level"
      variant="outlined"
      hideDetails="true"
      density="compact"
      v-model="currentSkillLevel"
      :items="characterSkillLevels"
    ></v-select>
    <v-select
      v-show="type === 'TARGET'"
      class="table-input"
      label="Skill Level"
      variant="outlined"
      hideDetails="true"
      density="compact"
      v-model="targetSkillLevel"
      :items="characterSkillLevels"
    ></v-select>
  </td>
</template>

<script>
import { OPERATOR_PLAN_CHANGE } from "../../store/actions";

export default {
  name: "OperatorTableRowSkillLevel",
  inject: ["operator", "type", "itemUse"],
  computed: {
    maxSkilllevel() {
      return Object.keys(this.itemUse.allSkillLvlup)[
        Object.keys(Object.keys(this.itemUse.allSkillLvlup)).length - 1
      ];
    },
    characterSkillLevels() {
      return [...Array(parseInt(this.maxSkilllevel)).keys()].map((value) => ({
        title: value + 1,
        value: value + 1,
      }));
    },
    currentSkillLevel: {
      get() {
        return this.$store.state.materialPlanner.currentOperator[
          this.operator.id
        ].skillLevel;
      },
      set(value) {
        this.$store.dispatch(OPERATOR_PLAN_CHANGE, {
          operatorId: this.operator.id,
          type: "CURRENT",
          skillLevel: value,
        });
      },
    },
    targetSkillLevel: {
      get() {
        return this.$store.state.materialPlanner.targetOperator[
          this.operator.id
        ].skillLevel;
      },
      set(value) {
        this.$store.dispatch(OPERATOR_PLAN_CHANGE, {
          operatorId: this.operator.id,
          type: "TARGET",
          skillLevel: value,
        });
      },
    },
  },
};
</script>
