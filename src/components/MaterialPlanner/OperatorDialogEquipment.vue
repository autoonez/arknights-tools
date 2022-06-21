<template>
  <OperatorDialogEquipmentSlider
    v-for="(equipmentLevels, equipmentId, index) in itemUse.modules"
    :key="index"
    :operatorId="operatorId"
    :equipmentId="equipmentId"
    :equipmentLevels="equipmentLevels"
  />
</template>

<script>
import OperatorDialogEquipmentSlider from "./OperatorDialogEquipmentSlider.vue";
export default {
  name: "OperatorDialogEquipment",
  props: ["operatorId"],
  data() {
    return {};
  },
  computed: {
    itemUse() {
      return this.$store.state.itemUseByCharacterId[this.operatorId];
    },
  },
  components: { OperatorDialogEquipmentSlider },
};
</script>
