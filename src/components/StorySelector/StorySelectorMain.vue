<template>
  <template v-for="(chapter, index) in storyByChapter" :key="index">
    <template v-if="language in chapter.name">
      <p class="text-h6 mb-2">{{ chapter.name[language] }}</p>
      <v-row class="mb-4">
        <v-col
          cols="6"
          sm="3"
          md="2"
          v-for="(story, i) in chapter.story"
          :key="i"
          v-show="language in story.name"
        >
          <v-card @click="$emit('select', story.id)">
            <v-img :src="getImageSrc(story.id)"></v-img>
            <v-card-title>{{ getEpisodeName(story.id) }}</v-card-title>
            <v-card-subtitle>{{ story.name[language] }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </template>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { assetUrl } from "../../constants";
import { useStoryTableStore } from "../../stores/StoryTableStore";

const props = defineProps<{
  language: string;
}>();
const emits = defineEmits(["select"]);

const { getMainStoryByChapter } = useStoryTableStore();

const storyByChapter = computed(() => getMainStoryByChapter());

const getEpisodeName = (id: string) => {
  return `Episode ${id.split("_")[1]}`;
};
const getImageSrc = (id: string) => {
  return `${assetUrl}/images/storyEntryPic/main/zone_page_${id}.webp`;
};
</script>
