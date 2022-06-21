<template>
  <OperatorDialogSkillMasterySlider
    v-for="(skill, index) in Object.values(itemUse.skills)"
    :key="index"
    :skill="skill"
    :operatorId="operatorId"
  ></OperatorDialogSkillMasterySlider>
</template>

<script>
import OperatorDialogSkillMasterySlider from "./OperatorDialogSkillMasterySlider.vue";
export default {
  name: "OperatorDialogSkillMastery",
  props: ["operatorId"],
  data() {
    return {};
  },
  computed: {
    itemUse() {
      return this.$store.state.itemUseByCharacterId[this.operatorId];
    },
  },
  components: { OperatorDialogSkillMasterySlider },
};
</script>
