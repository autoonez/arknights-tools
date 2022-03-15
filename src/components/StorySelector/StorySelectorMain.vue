<template>
  <template v-for="(chapter, index) in storyByChapter" :key="index">
    <v-list v-if="server in chapter.name">
      <v-list-subheader>{{ chapter.name[server] }}</v-list-subheader>
      <v-list-item
        v-for="(story, i) in chapter.story"
        :key="i"
        :prepend-avatar="getImageSrc(story.id)"
        @click="this.$emit('SELECT_STORY_ID', story.id)"
      >
        <v-list-item-header>
          <v-list-item-title>{{ getEpisode(story.id) }}</v-list-item-title>
          <v-list-item-subtitle>{{ story.name[server] }}</v-list-item-subtitle>
        </v-list-item-header>
      </v-list-item>
    </v-list>
  </template>
</template>

<script>
import { assetUrl } from "../../constants/url";
export default {
  props: ["storyByChapter", "server"],
  emits: ["SELECT_STORY_ID"],
  methods: {
    getEpisode(id) {
      return `Episode ${id.split("_")[1]}`;
    },
    getImageSrc(id) {
      return `${assetUrl}/images/storyEntryPic/main/zone_page_${id}.png`;
    },
  },
};
</script>
