<template>
  <v-app>
    <v-app-bar density="compact">
      <v-btn
        >File
        <v-menu activator="parent">
          <v-list>
            <v-list-item @click="storySelectDialog = true">Select</v-list-item>
            <v-list-item @click="storyFilesUploadDialog = true"
              >Upload</v-list-item
            >
          </v-list>
        </v-menu>
      </v-btn>
      <v-btn @click="storyDownloadOptionsDialog = true">Options </v-btn>
      <v-spacer></v-spacer>
      <v-btn :disabled="sheets.length === 0" @click="download">Download</v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <StoryDownloadPreview :data="previewData" />
      </v-container>
    </v-main>
    <StoryDownloadPreviewBottomNav
      :sheets="sheets.map((sheet) => sheet.name)"
      :index="previewIndex"
      @select="(index) => (previewIndex = index)"
    />

    <StoryFileSelectorDialog
      v-if="storySelectDialog"
      v-model="storySelectDialog"
      @save="saveFiles"
    />
    <StoryFilesUploadDialog
      v-model="storyFilesUploadDialog"
      @save-files="saveFiles"
    />
    <StoryDownloadOptionsDialog
      v-model="storyDownloadOptionsDialog"
      :options="options"
    />
  </v-app>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from "vue";
import StoryFilesUploadDialog from "../../components/StoryDownload/StoryFilesUploadDialog.vue";
import StoryDownloadPreview from "../../components/StoryDownload/StoryDownloadPreview.vue";
import {
  defaultStoryDownloadOptions,
  storyDownloadFilesToAoa,
} from "../../services/story-service";
import StoryDownloadOptionsDialog from "../../components/StoryDownload/StoryDownloadOptionsDialog.vue";
import StoryDownloadPreviewBottomNav from "../../components/StoryDownload/StoryDownloadPreviewBottomNav.vue";
import StoryFileSelectorDialog from "../../components/StoryDownload/StoryFileSelectorDialog.vue";
import * as XLSX from "xlsx";

export default defineComponent({
  name: "StoryDownload",
  components: {
    StoryFilesUploadDialog,
    StoryDownloadPreview,
    StoryDownloadOptionsDialog,
    StoryDownloadPreviewBottomNav,
    StoryFileSelectorDialog,
  },
  setup() {
    const loading = ref(false);
    const storySelectDialog = ref(false);
    const storyFilesUploadDialog = ref(false);
    const storyDownloadOptionsDialog = ref(false);

    const options = ref(defaultStoryDownloadOptions);

    const previewIndex = ref(0);
    const previewData = computed(() => sheets.value[previewIndex.value]?.aoa);

    const files: Ref<StoryDownloadFile[]> = ref([]);
    const saveFiles = (newFiles: StoryDownloadFile[]) => {
      storyFilesUploadDialog.value = false;
      storySelectDialog.value = false;
      files.value = newFiles;
      previewIndex.value = 0;
    };
    const sheets = computed(() => {
      if (files.value.length > 0) {
        return storyDownloadFilesToAoa(files.value, options.value);
      } else {
        return [];
      }
    });

    const download = () => {
      if (sheets.value.length > 0) {
        const wb = XLSX.utils.book_new();
        for (const sheet of sheets.value) {
          const ws = XLSX.utils.aoa_to_sheet(sheet.aoa);
          XLSX.utils.book_append_sheet(wb, ws, sheet.name);
        }
        XLSX.writeFile(wb, `${files.value[0].fileName}.xlsx`);
      }
    };

    return {
      loading,
      storySelectDialog,
      storyFilesUploadDialog,
      storyDownloadOptionsDialog,
      files,
      sheets,
      saveFiles,
      options,
      previewIndex,
      previewData,
      download,
    };
  },
});
</script>
