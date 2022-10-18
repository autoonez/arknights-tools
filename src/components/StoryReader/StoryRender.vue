<template>
  <v-progress-linear indeterminate v-if="loading"></v-progress-linear>

  <v-container v-if="ready">
    <RenderBlock
      v-for="(renderBlock, index) in renderBlocks"
      :key="index"
      :render-block="renderBlock"
      @select-char-image="
        (value) => {
          charImage = value;
        }
      "
    />
  </v-container>

  <StoryRenderBottomNav v-if="type === 'original'" />
  <StoryRenderBottomNavGoogleSheets v-if="type === 'spreadsheet'" />

  <CharImageDialog
    v-if="ready"
    :char-image="charImage"
    @close-dialog="charImage = ''"
  />
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { storyTypeDict } from "../../constants";
import { HTTP } from "../../services/http-service";
import {
  replaceStoryText,
  spreadsheetToJson,
  storyDataToRenderBlocks,
  storyTextToObject,
} from "../../services/story-service";
import { useStoryReaderStore } from "../../stores/StoryReaderStore";
import { useStoryTableStore } from "../../stores/StoryTableStore";
import RenderBlock from "./RenderBlock.vue";
import CharImageDialog from "./CharImageDialog.vue";
import StoryRenderBottomNav from "./StoryRenderBottomNav.vue";
import { AxiosError } from "axios";
import StoryRenderBottomNavGoogleSheets from "./StoryRenderBottomNavGoogleSheets.vue";

export default defineComponent({
  name: "StoryRender",
  props: ["storyFile", "storySetId", "type"],
  components: {
    RenderBlock,
    CharImageDialog,
    StoryRenderBottomNav,
    StoryRenderBottomNavGoogleSheets,
  },
  setup(props) {
    const router = useRouter();
    const store = useStoryReaderStore();
    const { storyTable, storyList } = useStoryTableStore();

    const loading = ref(false);
    const ready = ref(false);
    const errors: Ref<any[]> = ref([]);

    const charImage: Ref<string> = ref("");

    const language = computed(() => store.language);
    const storySet = computed(() => store.storySet);

    const renderBlocks: Ref<StoryLine[][]> = ref([]);

    watch(
      () => [
        props.storyFile,
        props.storySetId,
        props.type,
        language.value,
        store.spreadsheet?.currentSheet,
      ],
      async () => {
        try {
          loading.value = true;
          if (props.type === "original") {
            if (props.storySetId) {
              store.setStorySet(storyTable?.story[props.storySetId]);
            }
            if (!props.storyFile) {
              if (storySet.value) {
                router.push({
                  name:
                    storyTypeDict[storySet.value.type].routeName ||
                    "select-story-type",
                });
              } else {
                router.push({
                  name: "select-story-type",
                });
              }
            }
            if (storySet.value) {
              store.setStory(
                Object.values(storySet.value.story).find(
                  (story) => story.file === props.storyFile
                )
              );
            }
            const response = await HTTP.get(
              `/story/${language.value}/${props.storyFile}.txt`
            );
            const file = response.data;
            const storyData = storyTextToObject(file);
            renderBlocks.value = await storyDataToRenderBlocks(storyData.lines);
            ready.value = true;
            window.scrollTo(0, 0);
          } else if (props.type === "spreadsheet") {
            if (store.spreadsheet) {
              const { id, sheets, currentSheet } = store.spreadsheet;
              const response = await HTTP.get(
                `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/'${sheets[currentSheet]}'`,
                {
                  params: {
                    key: "AIzaSyDu129ufi2q02ZHJhoLYsO_0ew6nh9kQAQ",
                  },
                }
              );
              const lines: Array<Array<string>> = response.data?.values;

              const result = spreadsheetToJson(lines);

              if (!result.error) {
                if (lines[0][0] === "[FILE]") {
                  const fileName = lines[0][1];
                  const fileSrc = storyList.find((story) =>
                    story.includes(fileName)
                  );

                  const response = await HTTP.get(`/story/zh_CN/${fileSrc}`);
                  const file = response.data;
                  const storyData = storyTextToObject(file);
                  if (result.result) {
                    const replacedStoryLines = replaceStoryText({
                      original: storyData.lines,
                      target: result.result.lines,
                    });
                    renderBlocks.value = await storyDataToRenderBlocks(
                      replacedStoryLines
                    );
                    ready.value = true;
                    window.scrollTo(0, 0);
                  }
                } else {
                  if (result.result) {
                    renderBlocks.value = await storyDataToRenderBlocks(
                      result.result.lines
                    );
                    ready.value = true;
                    window.scrollTo(0, 0);
                  }
                }
              } else {
              }
            } else {
              router.push({
                name: "google-sheets",
              });
            }
          } else {
            router.push({
              name: "select-story-type",
            });
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            if (
              language.value !== "zh_CN" &&
              error?.code === "ERR_BAD_REQUEST"
            ) {
              store.setLanguage("zh_CN");
            } else {
              errors.value.push(error);
            }
          } else {
            errors.value.push(error);
          }
        } finally {
          loading.value = false;
        }
      },
      {
        immediate: true,
      }
    );

    return {
      loading,
      ready,
      charImage,
      errors,
      storySet,
      renderBlocks,
    };
  },
});
</script>
