/// <reference types="vitest" />

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from "vite-plugin-vuetify";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/arknights-tools/',
  plugins: [vue(), vuetify({ autoImport: true })],
  test: {
    environment: "happy-dom",
    setupFiles: "vuetify.config.ts",
    deps: {
      inline: ["vuetify"],
    },
    globals: true,
  },
});
