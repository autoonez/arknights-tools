<template>
  <v-container>
    <p>Current project</p>
    <ul>
      <li>
        <router-link
          :to="{
            name: 'select-story-type',
          }"
          >Story Reader</router-link
        >
      </li>
    </ul>
    <v-divider></v-divider>
    <p>Credits:</p>
    <ul>
      <li>
        Arknights Game Data:
        <a href="https://github.com/Kengxxiao/ArknightsGameData"
          >Kengxxiao/ArknightsGameData</a
        >
      </li>
      <li>
        Data Mining Tool:
        <a href="https://github.com/Perfare/AssetStudio">Perfare/AssetStudio</a>
      </li>
      <li>Mod Data Mining Tool: VaDiM#5824</li>
    </ul>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
});
</script>
