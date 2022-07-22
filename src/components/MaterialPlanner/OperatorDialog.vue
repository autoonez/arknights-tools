<template>
  <v-dialog fullscreen scrollable class="dialog">
    <v-card>
      <v-toolbar>
        <v-btn icon dark @click="this.$emit('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ operator.appellation }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="dialog-container">
        <v-row class="d-none d-sm-flex">
          <v-spacer></v-spacer>
          <v-col cols="5" class="text-center"><p>Current</p></v-col>
          <v-col cols="5" class="text-center"><p>Target</p></v-col>
        </v-row>
        <v-divider class="d-none d-sm-flex mt-4"></v-divider>
        <OperatorDialogPhase :operatorId="id" />
        <v-divider class="my-4"></v-divider>
        <OperatorDialogLevel :operatorId="id" />
        <v-divider class="my-4"></v-divider>
        <OperatorDialogSkillLevel :operatorId="id" />
        <v-divider class="my-4"></v-divider>
        <OperatorDialogSkillMastery :operatorId="id" />
        <v-divider class="my-4"></v-divider>
        <OperatorDialogEquipment :operatorId="id" /> </v-card-text></v-card
  ></v-dialog>
</template>

<script>
import OperatorDialogPhase from "./OperatorDialogPhase.vue";
import OperatorDialogLevel from "./OperatorDialogLevel.vue";
import OperatorDialogSkillLevel from "./OperatorDialogSkillLevel.vue";
import OperatorDialogSkillMastery from "./OperatorDialogSkillMastery.vue";
import OperatorDialogEquipment from "./OperatorDialogEquipment.vue";

export default {
  props: ["id"],
  emits: ["close"],
  computed: {
    operator() {
      return this.$store.state.character.characterDataById[this.id];
    },
  },
  components: {
    OperatorDialogPhase,
    OperatorDialogLevel,
    OperatorDialogSkillLevel,
    OperatorDialogSkillMastery,
    OperatorDialogEquipment,
  },
};
</script>

<style>
.dialog {
  z-index: 2400 !important;
}
.dialog-container {
  max-height: calc(100vh - 56px);
}
</style>
