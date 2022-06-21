<template>
  <v-row>
    <v-col cols="12" sm="6">
      <v-card variant="outlined">
        <v-card-title>Target</v-card-title>
        <v-card-actions>
          <v-btn variant="outlined" @click="setTargetToCurrent"
            >Set to current</v-btn
          >
          <v-btn variant="outlined" @click="setTargetToMax">Set to max</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>

  <v-card variant="outlined" class="mt-4">
    <v-toolbar>
      <v-btn
        variant="outlined"
        @click="this.$emit('openCharacterSelectorDialog')"
        >Select</v-btn
      >
    </v-toolbar>
    <v-card-text class="operatorContainer">
      <template v-for="(operator, index) in operators">
        <OperatorCard
          v-if="selectedOperatorIds.includes(operator.id)"
          :key="index"
          :id="operator.id"
          :name="operator.appellation"
          @click="selectOperator(operator.id)"
      /></template>
    </v-card-text>
  </v-card>
</template>

<script>
import OperatorCard from "./OperatorCard.vue";
import {
  OPERATOR_PLAN_SET_TARGET_EQUAL_CURRENT,
  OPERATOR_PLAN_SET_TARGET_TO_MAX,
} from "../../store/actions";
export default {
  emits: ["selectOperator", "openCharacterSelectorDialog"],
  inject: ["operators"],
  computed: {
    selectedOperatorIds() {
      return this.$store.state.materialPlanner.selectedOperatorIds;
    },
    characterDataById() {
      return this.$store.state.character.characterDataById;
    },
  },
  components: {
    OperatorCard,
  },
  methods: {
    selectOperator(id) {
      this.$emit("selectOperator", id);
    },
    setTargetToCurrent() {
      this.$store.dispatch(OPERATOR_PLAN_SET_TARGET_EQUAL_CURRENT);
    },
    setTargetToMax() {
      this.$store.dispatch(OPERATOR_PLAN_SET_TARGET_TO_MAX);
    },
  },
};
</script>

<style>
.operatorContainer {
  display: grid;
  grid-template-columns: repeat(auto-fit, 64px);
  grid-row-gap: 16px;
  justify-content: center;
}
</style>
