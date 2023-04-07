import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import { createVuetify } from "vuetify";
import StoryDownloadSelectPreviewSheetDialog from "./StoryDownloadSelectPreviewSheetDialog.vue";

const sheets = ["sheet1", "sheet2", "sheet3"];

describe("StoryDownloadSelectPreviewSheetDialog.vue", () => {
  const vuetify = createVuetify();

  const wrapper = mount(StoryDownloadSelectPreviewSheetDialog, {
    props: {
      modelValue: true,
      sheets,
    },
    global: {
      plugins: [vuetify],
    },
  });

  test("render", () => {
    expect(
      wrapper.findAllComponents(".v-list-item").map((item) => item.text())
    ).toEqual(sheets);
  });

  test("emit", async () => {
    for (let i = 0; i < sheets.length; i++) {
      await wrapper.findAllComponents(".v-list-item")[i].trigger("click");
    }

    const event = wrapper.emitted("select");

    expect(event).toHaveLength(sheets.length);

    if (event) {
      for (let i = 0; i < event?.length; i++) {
        expect(event[i]).toEqual([i]);
      }
    }
  });
});
