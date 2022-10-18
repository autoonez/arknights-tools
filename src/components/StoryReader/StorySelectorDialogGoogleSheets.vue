<template>
  <v-dialog>
    <v-card>
      <v-btn variant="text" :href="spreadsheet?.url">{{
        spreadsheet?.title || ""
      }}</v-btn>
      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="(sheet, index) in sheets"
          :key="index"
          @click="$emit('selectStory', index)"
        >
          <v-list-item-title>{{ sheet }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStoryReaderStore } from "../../stores/StoryReaderStore";

export default defineComponent({
  name: "StorySelectorDialogGoogleSheets",
  emits: ["selectStory"],
  setup() {
    const store = useStoryReaderStore();
    const spreadsheet = computed(() => store.spreadsheet);
    const sheets = computed(() => spreadsheet.value?.sheets || []);
    return {
      spreadsheet,
      sheets,
    };
  },
});
</script>
