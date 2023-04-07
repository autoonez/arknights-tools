import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import { createVuetify } from "vuetify";
import StoryDownloadPreview from "./StoryDownloadPreview.vue";

const data = [["r1c1", "r1c2"], ["r2c1"], ["r3c1", "r3c2", "r3c3"]];

describe("StoryDownloadPreview.vue", () => {
  const vuetify = createVuetify();

  test("render", () => {
    const wrapper = mount(StoryDownloadPreview, {
      global: {
        plugins: [vuetify],
      },
    });
    expect(wrapper.html()).toBeTruthy();
  });

  test("render with props", () => {
    const wrapper = mount(StoryDownloadPreview, {
      props: {
        data,
      },
      global: {
        plugins: [vuetify],
      },
    });
    expect(wrapper.findAll("tr")).toHaveLength(3);
    expect(wrapper.findAll("td")).toHaveLength(9);
  });
});
