<template v-if="story">
  <StorySelectorDialogGoogleSheets v-model="dialog" @select-story="selectStory" />

  <v-bottom-navigation density="compact">
    <v-btn icon="mdi-chevron-left" @click="selectPreviousStory"></v-btn>
    <v-btn variant="text" class="story-title-btn" @click="dialog = true">{{
      storyTitle
    }}</v-btn>
    <v-btn icon="mdi-chevron-right" @click="selectNextStory"></v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStoryReaderStore } from "../../stores/StoryReaderStore";
import StorySelectorDialogGoogleSheets from "./StorySelectorDialogGoogleSheets.vue";

export default defineComponent({
  name: "StoryRenderBottomNavGoogleSheets",
  setup() {
    const dialog = ref(false);

    const store = useStoryReaderStore();
    const storyTitle = computed(() => {
      if (store.spreadsheet) {
        return store.spreadsheet.sheets[store.spreadsheet.currentSheet];
      } else {
        return "";
      }
    });

    const selectPreviousStory = () => {
      if (store.spreadsheet) {
        const previousStory =
          store.spreadsheet?.sheets[store.spreadsheet.currentSheet - 1];
        if (store.spreadsheet.currentSheet > 0 && previousStory) {
          store.setSpreadsheetCurrentSheet(store.spreadsheet.currentSheet - 1);
        }
      }
    };
    const selectNextStory = () => {
      if (store.spreadsheet) {
        const nextStory =
          store.spreadsheet?.sheets[store.spreadsheet.currentSheet + 1];
        if (nextStory) {
          store.setSpreadsheetCurrentSheet(store.spreadsheet.currentSheet + 1);
        }
      }
    };
    const selectStory = (index: number) => {
      dialog.value = false;
      store.setSpreadsheetCurrentSheet(index);
    };

    return {
      dialog,
      storyTitle,
      selectPreviousStory,
      selectNextStory,
      selectStory,
    };
  },
  components: { StorySelectorDialogGoogleSheets },
});
</script>

<style scoped>
.story-title-btn {
  white-space: unset;
  max-width: calc(100vw - 128px) !important;
}
</style>
