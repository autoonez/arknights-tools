import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import { createVuetify } from "vuetify";
import StoryFilesSelector from "./StoryFilesSelector.vue";

const stories: StoryDetail[] = [
  {
    storyId: "main_10_level_st_10-01",
    name: {
      zh_CN: "被追逐者",
      en_US: "The Pursued",
      ja_JP: "追われる者",
      ko_KR: "쫓기는 자",
    },
    code: "10-1",
    sort: 61,
    file: "obt/main/level_st_10-01",
  },
  {
    storyId: "main_10_level_main_10-01_beg",
    name: {
      zh_CN: "抢夺目标",
      en_US: "Raid Target",
      ja_JP: "ターゲット奪取",
      ko_KR: "목표 탈환",
    },
    code: "10-2 Before",
    sort: 62,
    file: "obt/main/level_main_10-01_beg",
  },
  {
    storyId: "main_10_level_main_10-01_end",
    name: {
      zh_CN: "抢夺目标",
      en_US: "Raid Target",
      ja_JP: "ターゲット奪取",
      ko_KR: "목표 탈환",
    },
    code: "10-2 After",
    sort: 63,
    file: "obt/main/level_main_10-01_end",
  },
];

const selectedStories: {
  [storyId: string]: boolean;
} = {
  "main_10_level_st_10-01": true,
  "main_10_level_main_10-01_beg": false,
  "main_10_level_main_10-01_end": true,
};

describe("StoryFilesSelector.vue", () => {
  const vuetify = createVuetify();

  const wrapper = mount(StoryFilesSelector, {
    props: {
      stories,
      selectedStories,
      language: "en_US",
    },
    global: {
      plugins: [vuetify],
    },
  });

  test("render", () => {
    expect(wrapper.findAll("input")).toHaveLength(stories.length);

    for (const [index, item] of wrapper.findAll("input").entries()) {
      const story = stories[index];
      expect(item.element.checked).toEqual(selectedStories[story.storyId]);
    }
  });
});
