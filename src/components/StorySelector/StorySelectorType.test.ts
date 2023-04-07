import { mount } from "@vue/test-utils";
import { describe, test, expect } from "vitest";
import { createVuetify } from "vuetify";
import { storyType } from "../../constants";
import StorySelectorType from "./StorySelectorType.vue";

describe("StorySelectorType.vue", () => {
  const vuetify = createVuetify();
  const wrapper = mount(StorySelectorType, {
    props: {
      typeList: storyType,
    },
    global: {
      plugins: [vuetify],
    },
  });
  const items = wrapper.findAll(".v-list-item");

  test("render", () => {
    expect(items).toHaveLength(storyType.length);
  });

  test("emit", async () => {
    await items[0].trigger("click");
    await items[1].trigger("click");

    const event = wrapper.emitted("select");

    expect(event).toHaveLength(2);

    if (event && event.length > 0) {
      expect(event[0]).toEqual([storyType[0].id]);
      expect(event[1]).toEqual([storyType[1].id]);
    }
  });
});
