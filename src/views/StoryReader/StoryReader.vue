<template>
  <v-app>
    <v-progress-linear indeterminate v-if="loading"></v-progress-linear>

    <StoryReaderAppBar />

    <v-main>
      <v-container v-if="route.name !== 'render-story'">
        <router-view v-if="ready"></router-view>
      </v-container>
      <router-view
        v-else-if="route.name === 'render-story'"
        v-if="ready"
      ></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref, watch } from "vue";
import { useStoryTableStore } from "../../stores/StoryTableStore";
import { useCharactertore } from "../../stores/CharacterStore";
import { useCharacterSpriteTableStore } from "../../stores/CharacterSpriteTableStore";
import RenderBlock from "../../components/StoryReader/RenderBlock.vue";
import CharImageDialog from "../../components/StoryReader/CharImageDialog.vue";
import StoryReaderAppBar from "../../components/StoryReader/StoryReaderAppBar.vue";
import { useRoute } from "vue-router";
import { useStoryReaderStore } from "../../stores/StoryReaderStore";

export default defineComponent({
  name: "StoryReader",
  components: {
    RenderBlock,
    CharImageDialog,
    StoryReaderAppBar,
  },
  setup() {
    const route = useRoute();
    const store = useStoryReaderStore();
    const { getStoryTable } = useStoryTableStore();
    const { getCharacterTable } = useCharactertore();
    const { getCharacterSpriteTable } = useCharacterSpriteTableStore();
    const loading = ref(true);
    const ready = ref(false);
    const errors: Ref<any[]> = ref([]);

    const getData = async () => {
      loading.value = true;
      try {
        await getStoryTable();
        await getCharacterTable();
        await getCharacterSpriteTable();
      } catch (error) {
        errors.value.push(error);
      } finally {
        loading.value = false;
        ready.value = true;
      }
    };

    onMounted(async () => {
      await getData();
      watch(
        () => [route.name, store.storySet, store.story],
        () => {
          if (route.name === "select-story") {
            if (store.storySet) {
              let title = store.storySet.name[store.language];
              if (title) {
                document.title = title;
              } else {
                document.title = "Arknights Tools | Story Reader";
              }
            } else {
              document.title = "Arknights Tools | Story Reader";
            }
          } else {
            if (route.name === "render-story") {
              if (store.story) {
                let title = store.getStoryTitle(store.story.storyId);
                if (title) {
                  document.title = title;
                } else {
                  document.title = "Arknights Tools | Story Reader";
                }
              }
            } else {
              document.title = "Arknights Tools | Story Reader";
            }
          }
        },
        {
          immediate: true,
        }
      );
    });

    return {
      loading,
      ready,
      errors,
      route,
    };
  },
});
</script>
