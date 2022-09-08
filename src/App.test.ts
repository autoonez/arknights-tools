import { beforeAll, beforeEach, describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import App from "./App.vue";
import { createRouter, createWebHashHistory, Router } from "vue-router";
import { routes } from "./router";

describe("App.vue", () => {
  let router: Router;
  const vuetify = createVuetify();

  beforeEach(async () => {
    router = createRouter({
      history: createWebHashHistory(),
      routes,
    });
  });

  test("render", async () => {
    const app = mount(App, {
      global: {
        plugins: [vuetify, router],
      },
    });
    expect(app).toBeTruthy();
  });
});
