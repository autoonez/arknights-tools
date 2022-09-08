import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { StoryTypeEnum } from "../constants";
import { HTTP } from "../services/http-service";

export const useStoryTableStore = defineStore("StoryTableStore", () => {
  const storyTable: Ref<StoryTable | undefined> = ref();

  const getStoryTable = async () => {
    if (!storyTable.value) {
      storyTable.value = await HTTP.get("/table/story_review_table.json").then(
        (response) => response.data
      );
    }
  };

  const getStoryByType = (type: StoryTypeEnum) => {
    if (storyTable.value) {
      return Object.values(storyTable.value?.story).filter(
        (story) => story.type === type
      );
    }
  };

  const getMainStoryByChapter = () => {
    if (storyTable.value) {
      let mainStory = getStoryByType(
        StoryTypeEnum.MAIN_STORY
      ) as MainStorySetDetail[];

      let storyByChapter: {
        [chapter: string]: {
          id: string;
          name: LanguageNameDict;
          story: StorySetDetail[];
        };
      } = {};

      if (mainStory) {
        for (const story of mainStory) {
          if (story.chapter) {
            let chapter = storyTable.value.data.chapter[story.chapter];

            if (!(story.chapter in storyByChapter)) {
              storyByChapter[story.chapter] = {
                id: story.chapter,
                name: chapter.name,
                story: [],
              };
            }

            storyByChapter[story.chapter].story.push(story);
          }
        }
      }

      return storyByChapter;
    }
  };

  const getStorySetByCharacterId = () => {
    if (storyTable.value) {
      let characterStory = getStoryByType(
        StoryTypeEnum.CHARACTER_STORY
      ) as CharacterStorySetDetail[];

      let storyByCharacterId: {
        [characterid: string]: CharacterStorySetDetail[];
      } = {};

      if (characterStory) {
        for (const storySet of characterStory) {
          if (!(storySet.character in storyByCharacterId)) {
            storyByCharacterId[storySet.character] = [];
          }

          storyByCharacterId[storySet.character].push(storySet);
        }

        return storyByCharacterId;
      }
    }
  };

  const getCharacterStorySet = (characterId: string) => {
    if (storyTable.value) {
      let result: CharacterStorySetDetail[] = [];
      for (const storySet of Object.values(storyTable.value.story)) {
        let thisStorySet = storySet as CharacterStorySetDetail;
        if (thisStorySet.character === characterId) {
          result.push(thisStorySet);
        }
      }
      return result;
    }
  };

  return {
    storyTable,
    getStoryTable,
    getStoryByType,
    getMainStoryByChapter,
    getStorySetByCharacterId,
    getCharacterStorySet,
  };
});
