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

  <StoryRenderBottomNav />

  <CharImageDialog
    v-if="ready"
    :image-src="charImageSrc"
    @close-dialog="charImage = ''"
  />
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { storyTypeDict } from "../../constants";
import { HTTP } from "../../services/http-service";
import {
  storyDataToRenderBlocks,
  storyTextToObject,
} from "../../services/story-service";
import { useStoryReaderStore } from "../../stores/StoryReaderStore";
import { useStoryTableStore } from "../../stores/StoryTableStore";
import RenderBlock from "./RenderBlock.vue";
import CharImageDialog from "./CharImageDialog.vue";
import StoryRenderBottomNav from "./StoryRenderBottomNav.vue";
import { AxiosError } from "axios";

export default defineComponent({
  name: "StoryRender",
  props: ["storyFile", "storySetId"],
  components: { RenderBlock, CharImageDialog, StoryRenderBottomNav },
  setup(props) {
    const router = useRouter();
    const store = useStoryReaderStore();
    const { storyTable } = useStoryTableStore();

    const loading = ref(false);
    const ready = ref(false);
    const errors: Ref<any[]> = ref([]);
    const charImage = ref("");
    const charImageSrc = computed(() => {
      if (imagesUrlDict.value) {
        return imagesUrlDict.value["CHARACTER"][charImage.value];
      } else {
        return "";
      }
    });

    const language = computed(() => store.language);
    const storySet = computed(() => store.storySet);

    const renderBlocks: Ref<StoryLine[][]> = ref([]);
    const imagesUrlDict: Ref<
      | {
          [type: string]: {
            [image: string]: string;
          };
        }
      | undefined
    > = ref();

    watch(
      () => [props.storyFile, props.storySetId, language.value],
      async () => {
        try {
          loading.value = true;
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
          const prepareResult = await storyDataToRenderBlocks(storyData);
          renderBlocks.value = prepareResult.renderBlocks;
          imagesUrlDict.value = prepareResult.imagesUrl;
          ready.value = true;
          window.scrollTo(0, 0);
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
      charImageSrc,
      errors,
      storySet,
      renderBlocks,
      imagesUrlDict,
    };
  },
});
</script>
