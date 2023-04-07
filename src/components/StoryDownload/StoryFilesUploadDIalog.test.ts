import { mount } from "@vue/test-utils";
import { describe, expect, test, vi } from "vitest";
import { createVuetify } from "vuetify";
import StoryFilesUploadDialog from "./StoryFilesUploadDialog.vue";

const event = {
  target: { files: [new File([""], "test1.txt"), new File([""], "test2.txt")] },
};

describe("StoryFilesUploadDialog.vue", () => {
  const vuetify = createVuetify();

  const wrapper = mount(StoryFilesUploadDialog, {
    props: {
      modelValue: true,
    },
    global: {
      plugins: [vuetify],
    },
  });
  const saveButton = wrapper.findComponent(".v-btn");

  test("click save button when no file select", async () => {
    expect(saveButton.attributes("disabled")).toEqual("true");
    await saveButton.trigger("click");
    expect(wrapper.emitted("saveFiles")).toBeUndefined();
  });

  test("upload files", async () => {
    const mock = vi.fn().mockImplementation(wrapper.vm.onInputFileChange);
    await mock(event);
    expect(wrapper.vm.files).toHaveLength(2);

    await saveButton.trigger("click");
    expect(wrapper.emitted("saveFiles")).toHaveLength(1);
  });
});
