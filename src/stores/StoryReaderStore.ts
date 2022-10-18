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
          title = `${story.code}: ${
            story.name[language.value] || story.name["zh_CN"]
          }`;
        } else {
          title = `${story.name[language.value]}`;
        }

        return title;
      }
    }
  };

  const spreadsheet: Ref<SpreadsheetStore | undefined> = ref();
  const setSpreadsheet = (value: SpreadsheetStore) => {
    spreadsheet.value = value;
  };
  const setSpreadsheetCurrentSheet = (index: number) => {
    if (spreadsheet.value) {
      spreadsheet.value.currentSheet = index;
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
    spreadsheet,
    setSpreadsheet,
    setSpreadsheetCurrentSheet,
  };
});
