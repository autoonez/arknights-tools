<template>
  <v-dialog fullscreen scrollable :scrim="false" class="dialog">
    <v-card>
      <v-toolbar>
        <v-btn icon dark @click="this.$emit('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Current Item List</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="dialog-container">
        <div class="material-container">
          <MaterialCurrentItem
            v-for="(material, index) in materials"
            :key="index"
            :itemId="material.itemId"
          />
        </div> </v-card-text></v-card
  ></v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import MaterialCurrentItem from "./MaterialCurrentItem.vue";

export default {
  name: "MaterialCurrentDialog",
  emits: ["close"],
  computed: {
    ...mapGetters(["materials"]),
  },
  components: { MaterialCurrentItem },
};
</script>

<style scoped>
.material-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, 48px);
  grid-row-gap: 16px;
  justify-content: center;
}
</style>
