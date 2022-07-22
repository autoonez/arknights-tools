<template v-if="equipmentLevels">
  <td>
    <v-select
      v-show="type === 'CURRENT'"
      class="table-input"
      :label="equipmentLabel"
      variant="outlined"
      hideDetails="true"
      density="compact"
      v-model="currentLevel"
      :items="equipmentLevelOptions"
    ></v-select>
    <v-select
      v-show="type === 'TARGET'"
      class="table-input"
      :label="equipmentLabel"
      variant="outlined"
      hideDetails="true"
      density="compact"
      v-model="targetLevel"
      :items="equipmentLevelOptions"
    ></v-select>
  </td>
</template>

<script>
import { OPERATOR_PLAN_CHANGE } from "../../store/actions";

export default {
  name: "OperatorTableRowEquipment",
  props: ["index", "equipmentId", "equipmentLevels"],
  inject: ["operator", "type", "itemUse"],
  computed: {
    equipmentLabel() {
      return `Module ${this.index + 1}`;
    },
    maxLevel() {
      return this.equipmentLevels[this.equipmentLevels.length - 1] || 0;
    },
    equipmentLevelOptions() {
      return this.equipmentLevels.map((value) => ({
        title: value,
        value: value,
      }));
    },
    currentLevel: {
      get() {
        return this.$store.state.materialPlanner.currentOperator[
          this.operator.id
        ].modules[this.equipmentId];
      },
      set(value) {
        this.$store.dispatch(OPERATOR_PLAN_CHANGE, {
          operatorId: this.operator.id,
          type: "CURRENT",
          modules: {
            id: this.equipmentId,
            value,
          },
        });
      },
    },
    targetLevel: {
      get() {
        return this.$store.state.materialPlanner.targetOperator[
          this.operator.id
        ].modules[this.equipmentId];
      },
      set(value) {
        this.$store.dispatch(OPERATOR_PLAN_CHANGE, {
          operatorId: this.operator.id,
          type: "TARGET",
          modules: {
            id: this.equipmentId,
            value,
          },
        });
      },
    },
  },
};
</script>
