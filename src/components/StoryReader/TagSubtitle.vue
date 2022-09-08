<template>
  <v-card class="my-3">
    <v-card-text
      class="text-center"
      style="font-size: 1rem; line-height: 1.5rem"
    >
      <p v-for="(text, index) in line?.params.text" :key="index">
        {{ text }}
      </p></v-card-text
    >
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "TagSubtitle",
  props: {
    line: Object as PropType<StoryLine>,
  },
});
</script>
