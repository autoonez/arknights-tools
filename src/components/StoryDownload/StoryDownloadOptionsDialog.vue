<template>
  <v-dialog>
    <v-card>
      <v-btn-toggle v-model="tab" mandatory>
        <v-btn value="text" data-test="btn-text">Text</v-btn>
        <v-btn value="image" data-test="btn-image">Image</v-btn>
        <v-btn value="extra" data-test="btn-extra">Extra</v-btn>
        <v-btn value="sheet" data-test="btn-sheet">Sheet</v-btn>
      </v-btn-toggle>
      <v-card-text v-show="tab === 'text'">
        <v-checkbox
          label="Dialog"
          v-model="options.tags.DIALOG.enable"
          hide-details
        ></v-checkbox>
        <v-checkbox
          label="Multiline Dialog"
          v-model="options.tags.MULTILINE.enable"
          hide-details
        ></v-checkbox>
        <v-checkbox
          label="Description"
          v-model="options.tags.DESCRIPTION.enable"
          hide-details
        ></v-checkbox>
        <v-checkbox
          label="Subtitle"
          v-model="options.tags.SUBTITLE.enable"
          hide-details
        ></v-checkbox>
        <v-checkbox
          label="Sticker"
          v-model="options.tags.STICKER.enable"
          hide-details
        ></v-checkbox>
        <v-checkbox
          label="Decision"
          v-model="options.tags.DECISION.enable"
          hide-details
        ></v-checkbox>
      </v-card-text>
      <v-card-text v-show="tab === 'image'">
        <v-checkbox
          label="IMAGE"
          v-model="options.tags.IMAGE.enable"
          hide-details
        ></v-checkbox>
        <v-select
          v-model="options.tags.IMAGE.type"
          label="Image value type"
          :items="imageResultTypeItems"
          hide-details
        ></v-select>
        <v-checkbox
          label="BACKGROUND"
          v-model="options.tags.BACKGROUND.enable"
          hide-details
        ></v-checkbox>
        <v-select
          v-model="options.tags.BACKGROUND.type"
          label="Background image value type"
          :items="imageResultTypeItems"
          hide-details
        ></v-select>
        <v-checkbox
          label="Character Image"
          v-model="options.tags.CHARACTER.enable"
          hide-details
        ></v-checkbox>
      </v-card-text>
      <v-card-text v-show="tab === 'extra'">
        <v-checkbox
          label="Layout for Story Reader"
          v-model="options.extra.layoutForStoryReader"
          hide-details
        ></v-checkbox>
        <v-checkbox
          label="Characters image look up sheet"
          v-model="options.extra.characterImageLookUpSheet"
          hide-details
        ></v-checkbox>
        <v-divider></v-divider>
        <v-checkbox
          label="Characters name sheet"
          v-model="options.extra.characterNameSheet"
          hide-details
        ></v-checkbox>
        <v-checkbox
          label="Characters name sheet with image"
          v-model="options.extra.characterNameSheetWithImage"
          hide-details
        ></v-checkbox>
      </v-card-text>
      <v-card-text v-show="tab === 'sheet'">
        <v-select
          v-model="options.sheet.sheetName"
          label="Sheet name"
          :items="sheetNameItems"
          hide-details
        ></v-select>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

const imageResultTypeItems = [
  {
    title: "Image name",
    value: "name",
  },
  {
    title: "Image link on Github",
    value: "link",
  },
];

const sheetNameItems = [
  {
    title: "Story code with name",
    value: "code-name",
  },
  {
    title: "Only story code",
    value: "code",
  },
  {
    title: "File name",
    value: "file",
  },
];

export default defineComponent({
  name: "StoryDownloadOptionsDialog",
  props: ["options"],
  setup() {
    const tab = ref("text");
    return {
      tab,
      imageResultTypeItems,
      sheetNameItems,
    };
  },
});
</script>
