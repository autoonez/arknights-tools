import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import { createVuetify } from "vuetify";
import { createTestingPinia } from "@pinia/testing";
import { StoryTypeEnum } from "../../constants";
import StorySelectorActivity from "./StorySelectorActivity.vue";
import { useStoryTableStore } from "../../stores/StoryTableStore";

describe("StorySelectorActivity.vue", async () => {
  const vuetify = createVuetify();
  const pinia = createTestingPinia({
    stubActions: false,
  });
  const wrapper = mount(StorySelectorActivity, {
    props: {
      language: "en_US",
      type: StoryTypeEnum.ACTIVITY_STORY,
    },
    global: {
      plugins: [vuetify, pinia],
    },
  });

  const store = useStoryTableStore();
  await store.getStoryTable();

  test("render", async () => {
    let cards = wrapper.findAll(".v-card");
    expect(cards).toHaveLength(wrapper.vm.storyList.length);

    await wrapper.setProps({
      type: StoryTypeEnum.MINI_STORY,
    });
    cards = wrapper.findAll(".v-card");
    expect(cards).toHaveLength(wrapper.vm.storyList.length);
  });

  test("emit", async () => {
    const cards = wrapper.findAll(".v-card");
    await cards[0].trigger("click");
    await cards[1].trigger("click");

    const event = wrapper.emitted("select");

    expect(event).toHaveLength(2);

    if (event && event.length > 0) {
      expect(event[0]).toEqual([wrapper.vm.storyList[0].id]);
      expect(event[1]).toEqual([wrapper.vm.storyList[1].id]);
    }
  });
});
