<template>
  <v-row class="mt-4 align-center">
    <v-col cols="12" sm="2"
      ><v-img :src="imgSrc" width="64px" class="ma-auto"></v-img
    ></v-col>
    <v-col cols="12" sm="5">
      <p class="d-flex d-sm-none">Current Mastery Rank</p>
      <v-slider
        v-model="currentMastery"
        hide-details
        :ticks="masteryLabels"
        :min="0"
        :max="maxMastery"
        step="1"
        show-ticks="always"
      ></v-slider>
    </v-col>
    <v-col cols="12" sm="5">
      <p class="d-flex d-sm-none">Target Mastery Rank</p>
      <v-slider
        v-model="targetMastery"
        hide-details
        :ticks="masteryLabels"
        :min="0"
        :max="maxMastery"
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
  props: ["operatorId", "skill"],
  data() {
    return {};
  },
  computed: {
    imgSrc() {
      return `${assetUrl}/images/skills/skill_icon_${this.skill.skillId}.png`;
    },
    maxMastery() {
      return (
        Object.keys(this.skill.levelUpCostCond)[
          Object.keys(this.skill.levelUpCostCond).length - 1
        ] || 0
      );
    },
    masteryLabels() {
      return [...Array(parseInt(this.maxMastery) + 1).keys()].reduce(
        (byValue, value) => {
          byValue[value] = `${value}`;
          return byValue;
        },
        {}
      );
    },
    currentMastery: {
      get() {
        return this.$store.state.materialPlanner.currentOperator[
          this.operatorId
        ].skillMastery[this.skill.skillId];
      },
      set(value) {
        this.$store.dispatch(OPERATOR_PLAN_CHANGE, {
          operatorId: this.operatorId,
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
        return this.$store.state.materialPlanner.targetOperator[this.operatorId]
          .skillMastery[this.skill.skillId];
      },
      set(value) {
        this.$store.dispatch(OPERATOR_PLAN_CHANGE, {
          operatorId: this.operatorId,
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
