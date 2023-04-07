<template>
  <v-checkbox
    v-for="story in stories"
    hide-details
    :label="storyTitle(story.storyId.toString())"
    v-model="selectedStories[story.storyId]"
  ></v-checkbox>
</template>

<script setup lang="ts">
import { getStoryTitle } from "../../services/story-service";

const props = defineProps<{
  language: string;
  stories: StoryDetail[];
  selectedStories: {
    [storyId: string]: boolean;
  };
}>();

const storyTitle = (storyId: string) => {
  const story = props.stories.find((story) => story.storyId === storyId);
  if (story) {
    return getStoryTitle(story, props.language);
  } else {
    return "";
  }
};
</script>
