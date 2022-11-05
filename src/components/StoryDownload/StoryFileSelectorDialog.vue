<template>
  <v-dialog>
    <v-card>
      <v-select
        hide-details
        v-model="language"
        :items="
          languageList.map((lang) => ({
            title: lang.name,
            value: lang.id,
          }))
        "
      ></v-select>
      <v-progress-linear indeterminate v-show="loading"></v-progress-linear>
      <v-card-text>
        <v-window v-model="stage">
          <v-window-item value="select-story-type">
            <StorySelectorType
              :type-list="
                storyType.filter((type) => type.id !== 'GOOGLE_SHEETS')
              "
              @select="selectStoryType"
            />
          </v-window-item>
          <v-window-item value="select-story-main">
            <StorySelectorMain :language="language" @select="selectStorySet" />
          </v-window-item>
          <v-window-item value="select-story-activity">
            <StorySelectorActivity
              :language="language"
              :type="StoryTypeEnum.ACTIVITY_STORY"
              @select="selectStorySet"
            />
          </v-window-item>
          <v-window-item value="select-story-mini">
            <StorySelectorActivity
              :language="language"
              :type="StoryTypeEnum.MINI_STORY"
              @select="selectStorySet"
            />
          </v-window-item>
          <v-window-item value="select-story-character">
            <StorySelectorCharacter
              :language="language"
              @select="selectStorySet"
            />
          </v-window-item>
          <v-window-item value="select-story-files">
            <StoryFilesSelector
              :language="language"
              :stories="storySet ? Object.values(storySet?.story) : []"
              :selected-stories="selectedStories"
            />
          </v-window-item>
        </v-window>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn :disabled="!canGoBack" @click="goBack">back</v-btn>
        <v-spacer></v-spacer>
        <v-btn :disabled="selectedStoriesList.length === 0" @click="doSave"
          >save</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, Ref, ref } from "vue";
import {
  languageList,
  storyType,
  storyTypeDict,
  StoryTypeEnum,
} from "../../constants";
import { HTTP } from "../../services/http-service";
import { useStoryTableStore } from "../../stores/StoryTableStore";
import StorySelectorActivity from "../StorySelector/StorySelectorActivity.vue";
import StorySelectorCharacter from "../StorySelector/StorySelectorCharacter.vue";
import StorySelectorMain from "../StorySelector/StorySelectorMain.vue";
import StorySelectorType from "../StorySelector/StorySelectorType.vue";
import StoryFilesSelector from "./StoryFilesSelector.vue";

const emit = defineEmits<{
  (e: "save", files: StoryDownloadFile[]): void;
}>();

const loading = ref(true);
const stage = ref("loading");
const language = ref("en_US");

const storyTableStore = useStoryTableStore();
const storyTable = computed(() => storyTableStore.storyTable);
const storySet = computed(
  () => storyTable?.value?.story[selectedStorySet.value]
);

const selectedStoryType = ref("");
const selectStoryType = (type: string) => {
  selectedStoryType.value = type;
  const detail = storyType.find((t) => t.id === type);
  if (detail) {
    stage.value = detail.routeName;
  }
};

const selectedStorySet = ref("");
const selectedStories: Ref<{
  [storyId: string]: boolean;
}> = ref({});
const selectStorySet = (setId: string) => {
  selectedStorySet.value = setId;
  let result: {
    [storyId: string]: boolean;
  } = {};
  for (const storyId in storySet.value?.story) {
    result[storyId] = true;
  }
  selectedStories.value = result;
  stage.value = "select-story-files";
};

const selectedStoriesList = computed(() => {
  let result = [];
  for (const [storyId, value] of Object.entries(selectedStories.value)) {
    if (value === true) {
      result.push(storyId);
    }
  }
  return result;
});
const doSave = async () => {
  if (selectedStoriesList.value.length > 0) {
    if (storySet.value) {
      loading.value = true;
      let result: StoryDownloadFile[] = [];
      for (const storyId of selectedStoriesList.value) {
        const story = storySet.value.story[storyId];
        const data = await HTTP.get(
          `/story/${language.value}/${story.file}.txt`
        ).then((response) => response.data);
        result.push({
          name: story.name[language.value],
          code: story.code,
          fileName: story.file,
          data,
        });
      }
      emit("save", result);
    }
  }
};

const canGoBack = computed(
  () => !["loading", "select-story-type"].includes(stage.value)
);
const goBack = () => {
  if (stage.value === "select-story-files") {
    stage.value = storyTypeDict[selectedStoryType.value].routeName;
  } else if (storyType.find((type) => type.routeName === stage.value)) {
    stage.value = "select-story-type";
  }
};

onMounted(async () => {
  await storyTableStore.getStoryTable();
  loading.value = false;
  stage.value = "select-story-type";
});
</script>
