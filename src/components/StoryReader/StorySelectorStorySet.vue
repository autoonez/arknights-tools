<template>
  <v-list>
    <template v-for="(story, storyId) in storySet?.story">
      <v-list-item
        v-if="language in story.name"
        :to="{
          name: 'render-story',
          query: {
            storyFile: story.file,
            storySetId,
          },
        }"
      >
        <v-list-item-title>{{
          getStoryTitle(storyId.toString())
        }}</v-list-item-title>
      </v-list-item>
    </template>
  </v-list>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, watch } from "vue";
import { useRouter } from "vue-router";
import { useStoryReaderStore } from "../../stores/StoryReaderStore";
import { useStoryTableStore } from "../../stores/StoryTableStore";

export default defineComponent({
  name: "StorySelectorStorySet",
  props: ["storySetId", "storySetId"],
  setup(props) {
    const router = useRouter();
    const store = useStoryReaderStore();
    const { storyTable } = useStoryTableStore();

    const language = computed(() => store.language);
    const storySet = computed(() => store.storySet);

    const getStoryTitle = (storyId: string) => store.getStoryTitle(storyId);

    onBeforeMount(() => {
      watch(
        () => [props.storySetId, language.value],
        () => {
          if (props.storySetId) {
            store.setStorySet(storyTable?.story[props.storySetId]);

            if (storySet.value) {
              if (
                !(language.value in storySet.value.name) &&
                language.value !== "zh_CN"
              ) {
                store.setLanguage("zh_CN");
              }
            }
          } else {
            router.push({
              name: "select-story-type",
            });
          }
        },
        {
          immediate: true,
        }
      );
    });

    return {
      language,
      storySet,
      getStoryTitle,
    };
  },
});
</script>
