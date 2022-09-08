<template>
  <v-row class="my-3">
    <v-col cols="12" sm="2" class="pb-0 pb-sm-3"
      ><p
        class="font-weight-bold text-grey"
        :class="[{ hasImage: line?.params.image }]"
        @click="$emit('selectCharImage', line?.params.image)"
      >
        {{ line?.params.name }}
      </p>
    </v-col>
    <v-col cols="12" sm="8" class="pt-0 pt-sm-3"
      ><p
        v-for="(text, index) in line?.params.text"
        :key="index"
        :class="{
          'mt-1': index > 0,
        }"
      >
        {{ text }}
      </p></v-col
    >
  </v-row>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "TagCharacterSpeech",
  props: {
    line: Object as PropType<StoryLine>,
  },
  emits: ["selectCharImage"],
});
</script>

<style scoped>
.hasImage {
  cursor: pointer;
  text-decoration: underline;
}
</style>
