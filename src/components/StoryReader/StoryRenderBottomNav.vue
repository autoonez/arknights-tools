<template v-if="story">
  <StorySelectorDialog v-model="dialog" @select-story="selectStory" />

  <v-bottom-navigation density="compact">
    <v-btn icon="mdi-chevron-left" @click="selectPreviousStory"></v-btn>
    <v-btn variant="text" class="story-title-btn" @click="dialog = true">{{
      storyTitle
    }}</v-btn>
    <v-btn icon="mdi-chevron-right" @click="selectNextStory"></v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStoryReaderStore } from "../../stores/StoryReaderStore";
import StorySelectorDialog from "./StorySelectorDialog.vue";

export default defineComponent({
  name: "StoryRenderBottomNav",
  setup() {
    const router = useRouter();
    const dialog = ref(false);

    const store = useStoryReaderStore();
    const storySet = computed(() => store.storySet);
    const story = computed(() => store.story);
    const storyTitle = computed(() => {
      let title = "";
      if (storySet.value && story.value) {
        if (story.value.code) {
          title = `${story.value.code}: ${story.value.name[store.language]}`;
        } else {
          title = `${story.value.name[store.language]}`;
        }
      }
      return title;
    });

    const selectPreviousStory = () => {
      if (storySet.value) {
        const previousStory = Object.values(storySet.value?.story).find((s) => {
          if (story.value) {
            return s.sort === story.value.sort - 1;
          } else {
            return false;
          }
        });

        if (previousStory) {
          router.push({
            name: "render-story",
            query: {
              storyFile: previousStory.file,
              storySetId: storySet.value.id,
              type: 'original',
            },
          });
        }
      }
    };
    const selectNextStory = () => {
      if (storySet.value) {
        const nextStory = Object.values(storySet.value?.story).find((s) => {
          if (story.value) {
            return s.sort === story.value.sort + 1;
          } else {
            return false;
          }
        });

        if (nextStory) {
          router.push({
            name: "render-story",
            query: {
              storyFile: nextStory.file,
              storySetId: storySet.value.id,
              type: 'original',
            },
          });
        }
      }
    };
    const selectStory = (storyId: string) => {
      dialog.value = false;
      if (storySet.value) {
        const selectedStory = storySet.value.story[storyId];
        router.push({
          name: "render-story",
          query: {
            storyFile: selectedStory.file,
            storySetId: storySet.value.id,
            type: 'original',
          },
        });
      }
    };

    return {
      dialog,
      storyTitle,
      selectPreviousStory,
      selectNextStory,
      selectStory,
    };
  },
  components: { StorySelectorDialog },
});
</script>

<style scoped>
.story-title-btn {
  white-space: unset;
  max-width: calc(100vw - 128px) !important;
}
</style>
