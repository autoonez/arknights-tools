<template>
  <v-dialog>
    <v-card>
      <v-btn-toggle v-model="tab" mandatory>
        <v-btn value="text">Text</v-btn>
        <v-btn value="image">Image</v-btn>
        <v-btn value="extra">Extra</v-btn>
        <v-btn value="sheet">Sheet</v-btn>
      </v-btn-toggle>
      <v-card-text v-show="tab === 'text'">
        <v-checkbox
          label="Dialog"
          v-model="inputOptions.tags.DIALOG.enable"
          hide-details
        ></v-checkbox>
        <v-checkbox
          label="Multiline Dialog"
          v-model="inputOptions.tags.MULTILINE.enable"
          hide-details
        ></v-checkbox>
        <v-checkbox
          label="Description"
          v-model="inputOptions.tags.DESCRIPTION.enable"
          hide-details
        ></v-checkbox>
        <v-checkbox
          label="Subtitle"
          v-model="inputOptions.tags.SUBTITLE.enable"
          hide-details
        ></v-checkbox>
        <v-checkbox
          label="Sticker"
          v-model="inputOptions.tags.STICKER.enable"
          hide-details
        ></v-checkbox>
        <v-checkbox
          label="Decision"
          v-model="inputOptions.tags.DECISION.enable"
          hide-details
        ></v-checkbox>
      </v-card-text>
      <v-card-text v-show="tab === 'image'">
        <v-checkbox
          label="IMAGE"
          v-model="inputOptions.tags.IMAGE.enable"
          hide-details
        ></v-checkbox>
        <v-select
          v-model="inputOptions.tags.IMAGE.type"
          label="Image value type"
          :items="imageResultTypeItems"
          hide-details
        ></v-select>
        <v-checkbox
          label="BACKGROUND"
          v-model="inputOptions.tags.BACKGROUND.enable"
          hide-details
        ></v-checkbox>
        <v-select
          v-model="inputOptions.tags.BACKGROUND.type"
          label="Background image value type"
          :items="imageResultTypeItems"
          hide-details
        ></v-select>
        <v-checkbox
          label="Character Image"
          v-model="inputOptions.tags.CHARACTER.enable"
          hide-details
        ></v-checkbox>
      </v-card-text>
      <v-card-text v-show="tab === 'extra'">
        <v-checkbox
          label="Layout for Story Reader"
          v-model="inputOptions.extra.layoutForStoryReader"
          hide-details
        ></v-checkbox>
        <v-checkbox
          label="Characters image look up sheet"
          v-model="inputOptions.extra.characterImageLookUpSheet"
          hide-details
        ></v-checkbox>
        <v-divider></v-divider>
        <v-checkbox
          label="Characters name sheet"
          v-model="inputOptions.extra.characterNameSheet"
          hide-details
        ></v-checkbox>
        <v-checkbox
          label="Characters name sheet with image"
          v-model="inputOptions.extra.characterNameSheetWithImage"
          hide-details
        ></v-checkbox>
      </v-card-text>
      <v-card-text v-show="tab === 'sheet'">
        <v-select
          v-model="inputOptions.sheet.sheetName"
          label="Sheet name"
          :items="sheetNameItems"
          hide-details
        ></v-select>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, watch } from "vue";
import { defaultStoryDownloadOptions } from "../../services/story-service";

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
  setup(props, { emit }) {
    const tab = ref("text");
    const inputOptions: Ref<StoryDownloadOptions> = ref(
      props.options || defaultStoryDownloadOptions
    );
    watch(
      () => [
        inputOptions.value.tags.CHARACTER.enable,
        inputOptions.value.extra.characterNameSheetWithImage,
        inputOptions.value.extra.characterImageLookUpSheet,
      ],
      () => {
        if (
          inputOptions.value.extra.characterNameSheetWithImage ||
          inputOptions.value.extra.characterImageLookUpSheet
        ) {
          inputOptions.value.tags.CHARACTER.enable = true;
        }
      }
    );
    watch(
      () => inputOptions.value.extra.characterNameSheetWithImage,
      () => {
        if (inputOptions.value.extra.characterNameSheetWithImage) {
          inputOptions.value.extra.characterNameSheet = true;
        }
      }
    );
    return {
      tab,
      inputOptions,
      imageResultTypeItems,
      sheetNameItems,
    };
  },
});
</script>
