<template>
  <v-dialog v-model="show" fullscreen scrollable :scrim="false" class="dialog">
    <v-card>
      <v-toolbar>
        <v-btn icon dark @click="show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Current Item List</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="dialog-container">
        <div class="current-item-container">
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
  name: "MaterialListDialog",
  props: ["value"],
  emits: ["set"],
  computed: {
    ...mapGetters(["materials"]),
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("set", value);
      },
    },
  },
  components: { MaterialCurrentItem },
};
</script>

<style scoped>
.current-item-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, 64px);
  grid-row-gap: 16px;
  justify-content: center;
}
</style>
