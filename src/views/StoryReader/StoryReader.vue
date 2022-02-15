<template>
  <div>
    <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
    <!-- <StoryReaderBreadcrumb :storyTypeList="storyTypeList" /> -->
    <v-container v-if="!loading">
      <router-view :storyTable="storyTable" />
    </v-container>
  </div>
</template>

<script>
export default {
  created() {
    this.getStoryTable();
  },
  data() {
    return {
      loading: false,
      storyTable: {},
      serverList: [
        { id: "zh_CN", name: "China" },
        { id: "en_US", name: "Global" },
        { id: "ja_JP", name: "Japan" },
        { id: "ko_KR", name: "Korea" },
        { id: "zh_TW", name: "Taiwan" },
      ],
      storyTypeList: [
        { id: "MAIN_STORY", name: "MAIN STORY" },
        { id: "ACTIVITY_STORY", name: "Activity Story" },
        { id: "MINI_STORY", name: "Mini Activity Story" },
        { id: "CHARACTER_STORY", name: "CHARACTER STORY" },
      ],
      storySelector: {
        storyType: "",
      },
    };
  },
  methods: {
    getStoryTable() {
      this.loading = true;
      fetch("/arknights-assets/table/story_review_table.json")
        .then((response) => response.json())
        .then((data) => {
          this.storyTable = data;
          this.loading = false;
        });
    },
  },
};
</script>
