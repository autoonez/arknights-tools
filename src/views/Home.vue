<template>
  <v-container>
    <v-card>
      <v-card-title>Current project</v-card-title>
      <v-list>
        <v-list-item
          :to="{
            name: 'select-story-type',
          }"
          >Story Reader</v-list-item
        >
        <v-list-item
          :to="{
            name: 'Story Download',
          }"
          >Story Download</v-list-item
        >
      </v-list>
      <v-divider></v-divider>
      <v-card-title>Credits</v-card-title>
      <v-list>
        <v-list-item>
          Arknights Game Data:
          <a href="https://github.com/Kengxxiao/ArknightsGameData"
            >Kengxxiao/ArknightsGameData</a
          >
        </v-list-item>
        <v-list-item>
          Data Mining Tool:
          <a href="https://github.com/Perfare/AssetStudio"
            >Perfare/AssetStudio</a
          >
        </v-list-item>
        <v-list-item>Mod Data Mining Tool: VaDiM#5824</v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
});
</script>
