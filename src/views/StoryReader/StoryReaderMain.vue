<template>
  <v-banner>
    <v-banner-text>{{ storyName }}</v-banner-text>
  </v-banner>
  <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
  <StoryReaderRender v-if="!loading" :storyData="storyData" />
</template>

<script>
import { storyTextToObject } from "../../helpers/storyHelper";
import StoryReaderRender from "../../components/StoryReader/StoryReaderRender.vue";

export default {
  props: ["storyId", "storyIndex", "server", "storyTable"],
  data() {
    return {
      loading: true,
      storyInfo: {},
      storyData: {
        lines: [],
        tagCount: {},
      },
    };
  },
  created() {
    this.$watch(
      () => [this.storyId, this.storyIndex, this.server],
      () => {
        this.getStoryInfo();
      },
      { immediate: true }
    );
  },
  methods: {
    getStoryInfo() {
      let storySet = this.storyTable.find((story) => story.id === this.storyId);
      if (!storySet) this.$router.push("/story-reader");
      if (storySet) {
        if (!Object.keys(storySet.name).includes(this.server)) {
          this.$router.push({
            path: "/story-reader",
            query: {
              storyId: this.storyId,
            },
          });
        }
        let storyInfo = storySet.story.find(
          (story) => story.sort === parseInt(this.storyIndex)
        );
        if (!storyInfo)
          this.$router.push({
            path: "/story-reader",
            query: {
              storyId: this.storyId,
              server: this.server,
            },
          });
        this.storyInfo = storyInfo;
      }
    },
  },
  computed: {
    storyName() {
      return `${this.storyInfo.code ? `${this.storyInfo.code}: ` : ``}${
        this.storyInfo.name[this.server]
      }`;
    },
  },
  watch: {
    storyInfo() {
      this.loading = true;
      fetch(
        `/arknights-assets/story/${this.server}/${this.storyInfo.file}.txt`
      ).then((response) =>
        response.text().then((text) => {
          let storyData = storyTextToObject(text);
          this.storyData = storyData;
          this.loading = false;
        })
      );
    },
  },
  components: { StoryReaderRender },
};
</script>
