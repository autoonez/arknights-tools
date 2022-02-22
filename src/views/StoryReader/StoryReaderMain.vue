<template>
  <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
  <StoryReaderRender v-if="!loading" :storyData="storyData" />
</template>

<script>
import { storyTextToObject } from "../../helpers/storyHelper";
import StoryReaderRender from "../../components/StoryReader/StoryReaderRender.vue";
import { assetUrl } from "../../constants/url";

export default {
  props: ["storyFile"],
  data() {
    return {
      loading: true,
      storyData: {
        lines: [],
        tagCount: {},
      },
      storyInfo: undefined,
    };
  },
  created() {
    this.$watch(
      () => [this.storyFile],
      () => {
        this.getStoryInfo();
      },
      { immediate: true }
    );
  },
  methods: {
    getStoryInfo() {
      if (this.storyFile.file) {
        this.loading = true;
        fetch(
          `${assetUrl}/story/${this.storyFile.server}/${this.storyFile.file}.txt`
        ).then((response) =>
          response.text().then((text) => {
            let storyData = storyTextToObject(text);
            this.storyData = storyData;
            this.loading = false;
          })
        );
      }
    },
  },
  components: { StoryReaderRender },
};
</script>
