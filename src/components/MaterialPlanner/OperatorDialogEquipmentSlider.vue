<template>
  <v-row class="mt-4 align-center">
    <v-col cols="12" sm="2"
      ><v-img :src="imgSrc" width="100%" class="ma-auto"></v-img
    ></v-col>
    <v-col cols="12" sm="5">
      <p class="d-flex d-sm-none">Current Module Level</p>
      <v-slider
        v-model="currentLevel"
        :ticks="levelLabels"
        hide-details
        :min="0"
        :max="maxLevel"
        step="1"
        show-ticks="always"
      ></v-slider>
    </v-col>
    <v-col cols="12" sm="5">
      <p class="d-flex d-sm-none">Target Module Level</p>
      <v-slider
        v-model="targetLevel"
        :ticks="levelLabels"
        hide-details
        :min="0"
        :max="maxLevel"
        step="1"
        show-ticks="always"
      ></v-slider
    ></v-col>
  </v-row>
</template>

<script>
import { assetUrl } from "../../constants/url";
import { OPERATOR_PLAN_CHANGE } from "../../store/actions";

export default {
  name: "OperatorDialogEquipmentSlider",
  props: ["operatorId", "equipmentId", "equipmentLevels"],
  data() {
    return {};
  },
  computed: {
    equipment() {
      return this.$store.state.equipmentDataById[this.equipmentId];
    },
    imgSrc() {
      return `${assetUrl}/images/equipments/${
        this.equipment.uniEquipIcon === "original"
          ? "default"
          : this.equipment.uniEquipIcon
      }.png`;
    },
    maxLevel() {
      return (
        Object.keys(this.equipmentLevels)[
          Object.keys(this.equipmentLevels).length - 1
        ] || 0
      );
    },
    levelLabels() {
      return [...Array(parseInt(this.maxLevel) + 1).keys()].reduce(
        (byValue, value) => {
          byValue[value] = `${value}`;
          return byValue;
        },
        {}
      );
    },
    currentLevel: {
      get() {
        return this.$store.state.materialPlanner.currentOperator[
          this.operatorId
        ].modules[this.equipmentId];
      },
      set(value) {
        this.$store.dispatch(OPERATOR_PLAN_CHANGE, {
          operatorId: this.operatorId,
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
        return this.$store.state.materialPlanner.targetOperator[this.operatorId]
          .modules[this.equipmentId];
      },
      set(value) {
        this.$store.dispatch(OPERATOR_PLAN_CHANGE, {
          operatorId: this.operatorId,
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
