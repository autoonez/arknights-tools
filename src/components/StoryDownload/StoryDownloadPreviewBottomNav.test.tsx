import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import { createVuetify } from "vuetify";
import StoryDownloadPreviewBottomNav from "./StoryDownloadPreviewBottomNav.vue";
import { defineComponent, h } from "vue";
import { VApp } from "vuetify/components";

const sheets = ["sheet1", "sheet2", "sheet3"];

describe("StoryDownloadPreviewBottomNav.vue", () => {
  const vuetify = createVuetify();

  const wrapper = mount(VApp, {
    slots: {
      default: h(StoryDownloadPreviewBottomNav, {
        sheets,
        index: 0,
      }),
    },
    global: {
      plugins: [vuetify],
    },
  });

  test("render", () => {
    expect(wrapper.findAll("button")[1].text()).toBe(sheets[0]);
  });

  test("selectNext", async () => {
    await wrapper.findAll("button")[2].trigger("click");
    console.log(wrapper.vm.$slots?.default);
  });
});
