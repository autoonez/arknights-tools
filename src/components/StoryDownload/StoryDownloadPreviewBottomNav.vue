<template>
  <StoryDownloadSelectPreviewSheetDialog
    :sheets="sheets"
    v-model="dialog"
    @select="
      (index) => {
        $emit('select', index);
        dialog = false;
      }
    "
  />

  <v-bottom-navigation density="compact" v-if="sheets.length > 0">
    <v-btn icon="mdi-chevron-left" @click="selectPrevious"></v-btn>
    <v-btn variant="text" class="story-title-btn" @click="dialog = true">{{
      sheets[index]
    }}</v-btn>
    <v-btn icon="mdi-chevron-right" @click="selectNext"></v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import StoryDownloadSelectPreviewSheetDialog from "./StoryDownloadSelectPreviewSheetDialog.vue";

export default defineComponent({
  name: "StoryDownloadPreviewBottomNav",
  props: ["sheets", "index"],
  emits: ["select"],
  setup(props, { emit }) {
    const dialog = ref(false);
    const selectNext = () => {
      if (props.index + 1 < props.sheets.length) {
        emit("select", props.index + 1);
      }
    };
    const selectPrevious = () => {
      if (props.index > 0) {
        emit("select", props.index - 1);
      }
    };
    return {
      dialog,
      selectNext,
      selectPrevious,
    };
  },
  components: { StoryDownloadSelectPreviewSheetDialog },
});
</script>
