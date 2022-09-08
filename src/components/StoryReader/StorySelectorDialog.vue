<template>
  <v-dialog>
    <v-card>
      <v-list>
        <v-list-item
          v-for="(story, storyId, index) in storySet?.story"
          :key="index"
          @click="$emit('selectStory', storyId)"
        >
          <v-list-item-title>{{
            getStoryTitle(storyId.toString())
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStoryReaderStore } from "../../stores/StoryReaderStore";

export default defineComponent({
  name: "StorySelectorDialog",
  emits: ["selectStory"],
  setup() {
    const store = useStoryReaderStore();
    const storySet = computed(() => store.storySet);

    const getStoryTitle = (storyId: string) => store.getStoryTitle(storyId);

    return {
      storySet,
      getStoryTitle,
    };
  },
});
</script>
