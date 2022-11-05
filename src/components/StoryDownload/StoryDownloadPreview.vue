<template>
  <v-table v-if="data">
    <tbody>
      <tr v-for="(row, index) in data">
        <td>{{ index + 1 }}</td>
        <td v-for="column in row">{{ column }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "StoryDownloadPreview",
  props: ["data"],
  setup() {
    return {};
  },
});
</script>
