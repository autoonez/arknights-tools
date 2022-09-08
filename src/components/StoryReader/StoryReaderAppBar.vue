<template>
  <v-navigation-drawer v-model="drawer" bottom temporary>
    <v-list>
      <v-list-item
        v-for="(type, index) in storyType"
        :key="index"
        :to="{
          name: type.routeName,
        }"
      >
        <v-list-item-title>{{ type.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar density="compact">
    <v-app-bar-nav-icon
      variant="text"
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-btn
      variant="text"
      icon="mdi-translate"
      @click="selectLanguageDialog = true"
    ></v-btn>
  </v-app-bar>

  <LanguageSelectorDialog
    v-model="selectLanguageDialog"
    :options="availableLanguages"
    @select-language="selectLanguage"
  />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { languageList, storyType } from "../../constants";
import { useStoryReaderStore } from "../../stores/StoryReaderStore";
import LanguageSelectorDialog from "../LanguageSelectorDialog.vue";

export default defineComponent({
  namme: "StoryReaderAppBar",
  setup() {
    const route = useRoute();
    const store = useStoryReaderStore();

    const drawer = ref(false);
    const selectLanguageDialog = ref(false);

    const storySet = computed(() => store.storySet);
    const story = computed(() => store.story);
    const availableLanguages = computed(() => {
      let result: string[] = [];
      if (route.name === "render-story") {
        if (story) {
          result = languageList
            .filter((lang) => {
              if (story.value) {
                return lang.id in story.value?.name;
              } else {
                return false;
              }
            })
            .map((lang) => lang.id);
        }
      } else if (route.name === "select-story") {
        if (storySet) {
          result = languageList
            .filter((lang) => {
              if (storySet.value) {
                return lang.id in storySet.value?.name;
              } else {
                return false;
              }
            })
            .map((lang) => lang.id);
        }
      } else {
        result = languageList.map((lang) => lang.id);
      }
      return result;
    });
    
    const selectLanguage = (lang: string) => {
      store.setLanguage(lang);
      selectLanguageDialog.value = false;
    };

    return {
      drawer,
      selectLanguageDialog,
      availableLanguages,
      selectLanguage,
      storyType,
    };
  },
  components: { LanguageSelectorDialog },
});
</script>
