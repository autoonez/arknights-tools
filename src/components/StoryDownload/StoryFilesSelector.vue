<template>
  <v-checkbox
    v-for="story in stories"
    hide-details
    :label="getStoryTitle(story.storyId.toString())"
    v-model="selectedStories[story.storyId]"
  ></v-checkbox>
</template>

<script setup lang="ts">
const props = defineProps<{
  language: string;
  stories: StoryDetail[];
  selectedStories: {
    [storyId: string]: boolean;
  };
}>();
const emit = defineEmits<{
  (
    e: "change",
    stories: {
      [storyId: string]: boolean;
    }
  ): void;
}>();

const getStoryTitle = (storyId: string) => {
  let title = "";
  const story = props.stories.find((detail) => detail.storyId === storyId);
  if (story) {
    if (story?.code) {
      title = `${story.code}: ${
        story.name[props.language] || story.name["zh_CN"]
      }`;
    } else {
      title = `${story.name[props.language] || story.name["zh_CN"]}`;
    }

    return title;
  }
};
</script>
