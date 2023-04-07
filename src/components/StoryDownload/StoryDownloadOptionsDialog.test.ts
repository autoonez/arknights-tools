import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import { createVuetify } from "vuetify";
import { defaultStoryDownloadOptions } from "../../services/story-service";
import StoryDownloadOptionsDialog from "./StoryDownloadOptionsDialog.vue";

const options = defaultStoryDownloadOptions;

describe("StoryDownloadOptions.vue", () => {
  const vuetify = createVuetify();

  const wrapper = mount(StoryDownloadOptionsDialog, {
    props: {
      modelValue: true,
      options,
    },
    global: {
      plugins: [vuetify],
    },
  });

  const textButton = wrapper.findComponent('[data-test="btn-text"]');
  const imageButton = wrapper.findComponent('[data-test="btn-image"]');
  const extraButton = wrapper.findComponent('[data-test="btn-extra"]');
  const sheetButton = wrapper.findComponent('[data-test="btn-sheet"]');

  test("tab buttons", async () => {
    expect(wrapper.vm.tab).toBe("text");

    await imageButton.trigger("click");
    expect(wrapper.vm.tab).toBe("image");

    await extraButton.trigger("click");
    expect(wrapper.vm.tab).toBe("extra");

    await sheetButton.trigger("click");
    expect(wrapper.vm.tab).toBe("sheet");

    await textButton.trigger("click");
    expect(wrapper.vm.tab).toBe("text");
  });
});
