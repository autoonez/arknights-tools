<template>
  <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
  <template v-if="!loading">
    <StorySelector :storyTable="storyTable" @selectFile="selectFile" />
    <StoryReaderMain :storyFile="storyFile" />
  </template>
</template>

<script>
import { assetUrl } from "../../constants/url";
import StorySelector from "../../components/StorySelector/StorySelector.vue";
import StoryReaderMain from "./StoryReaderMain.vue";
export default {
  props: ["storyType", "storyId", "storyIndex", "server"],
  created() {
    this.getStoryTable();
  },
  data() {
    return {
      loading: false,
      storyTable: {},
      storyFile: {
        file: "",
        server: "",
      },
    };
  },
  methods: {
    getStoryTable() {
      this.loading = true;
      fetch(`${assetUrl}/table/story_review_table.json`)
        .then((response) => response.json())
        .then((data) => {
          this.storyTable = data;
          this.loading = false;
        });
    },
    selectFile({ file, server }) {
      this.storyFile = {
        file,
        server,
      };
    },
  },
  components: { StorySelector, StoryReaderMain },
};
</script>
