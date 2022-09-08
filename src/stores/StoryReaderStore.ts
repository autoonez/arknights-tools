import { defineStore } from "pinia";
import { Ref, ref } from "vue";

export const useStoryReaderStore = defineStore("StoryReaderStore", () => {
  const language = ref("en_US");
  const setLanguage = (value: string) => {
    language.value = value;
  };

  const storySet: Ref<
    | MainStorySetDetail
    | ActivityStorySetDetail
    | CharacterStorySetDetail
    | undefined
  > = ref();
  const setStorySet = (
    value:
      | MainStorySetDetail
      | ActivityStorySetDetail
      | CharacterStorySetDetail
      | undefined
  ) => {
    storySet.value = value;
  };

  const story: Ref<StoryDetail | undefined> = ref();
  const setStory = (value: StoryDetail | undefined) => {
    story.value = value;
  };

  const getStoryTitle = (storyId: string) => {
    let title = "";
    if (storySet.value) {
      const story = storySet.value.story[storyId];
      if (story) {
        if (story?.code) {
          title = `${story.code}: ${story.name[language.value]}`;
        } else {
          title = `${story.name[language.value]}`;
        }

        return title;
      }
    }
  };

  return {
    language,
    setLanguage,
    storySet,
    setStorySet,
    story,
    setStory,
    getStoryTitle,
  };
});
