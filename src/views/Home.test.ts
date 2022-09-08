import { describe, expect, test } from "vitest";
import { createVuetify } from "vuetify/lib/framework.mjs";
import Home from "./Home.vue";
import { mount } from "@vue/test-utils";

describe("Home.vue", () => {
  const vuetiy = createVuetify();

  test("render", () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [vuetiy],
      },
    });
    expect(wrapper).toBeTruthy();
  });
});
