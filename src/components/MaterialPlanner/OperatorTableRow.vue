<template>
  <tr>
    <td>
      <input type="checkbox" v-model="isSelected" />
    </td>
    <td>
      <div
        class="operator-row"
        @click="this.$emit('selectOperator', operator.id)"
      >
        <img :src="imgSrc" class="operator-img" />
        <p class="operator-name">{{ operator.appellation }}</p>
      </div>
    </td>
    <template v-if="isSelected">
      <OperatorTableRowPhase />
      <OperatorTableRowLevel />
      <OperatorTableRowSkillLevel />
      <OperatorTableRowSkillMastery
        v-for="(skill, skillId, index) in itemUse.skills"
        :key="index"
        :skill="skill"
        :index="index"
      />
      <OperatorTableRowEquipment
        v-for="(equipment, index) in modules"
        :key="index"
        :index="index"
        :equipmentId="equipment.id"
        :equipmentLevels="equipment.levels"
      />
    </template>
    <td>
      <MaxMinButton @set="setPlan" />
    </td>
  </tr>
</template>

<script>
import { computed } from "vue";
import { assetUrl } from "../../constants/url";
import OperatorTableRowPhase from "./OperatorTableRowPhase.vue";
import OperatorTableRowLevel from "./OperatorTableRowLevel.vue";
import OperatorTableRowSkillLevel from "./OperatorTableRowSkillLevel.vue";
import OperatorTableRowSkillMastery from "./OperatorTableRowSkillMastery.vue";
import {
  OPERATOR_PLAN_SET,
  SELECTED_OPERATOR_TOGGLE,
} from "../../store/actions";
import OperatorTableRowEquipment from "./OperatorTableRowEquipment.vue";
import MaxMinButton from "../MaxMinButton.vue";

export default {
  name: "OperatorTableRow",
  props: ["operator", "selected"],
  emits: ["selectOperator"],
  inject: ["type"],
  computed: {
    imgSrc() {
      return `${assetUrl}/images/avatar/${this.operator.id}.png`;
    },
    itemUse() {
      return this.$store.state.itemUseByCharacterId[this.operator.id];
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
    isSelected: {
      get() {
        return this.selected;
      },
      set() {
        this.$store.dispatch(SELECTED_OPERATOR_TOGGLE, this.operator.id);
      },
    },
    modules() {
      return Object.entries(this.itemUse.modules).reduce(
        (modules, [moduleId, levels]) => {
          if (Object.keys(levels).length > 0) {
            modules.push({
              id: moduleId,
              levels: Object.keys(levels),
            });
          }
          return modules;
        },
        []
      );
    },
  },
  methods: {
    setPlan(value) {
      this.$store.dispatch(OPERATOR_PLAN_SET, {
        operatorId: this.operator.id,
        type: this.type,
        value,
      });
    },
  },
  provide() {
    return {
      operator: computed(() => this.operator),
      itemUse: computed(() => this.itemUse),
    };
  },
  components: {
    OperatorTableRowPhase,
    OperatorTableRowLevel,
    OperatorTableRowSkillLevel,
    OperatorTableRowSkillMastery,
    OperatorTableRowEquipment,
    MaxMinButton,
  },
};
</script>

<style scoped>
.operator-row {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.operator-img {
  height: 48px;
  margin-right: 8px;
}
.operator-name {
  white-space: nowrap;
}
</style>
<style>
.table-input {
  min-width: max-content;
}
</style>
