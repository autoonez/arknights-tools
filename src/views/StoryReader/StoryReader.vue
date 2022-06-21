<template>
  <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
  <template v-if="!loading">
    <StorySelector :storyTable="storyTable" @selectFile="selectFile" />
    <StoryReaderMain :storyFile="storyFile" />
  </template>
</template>

<script>
import { assetUrl } from "../../constants/url";
import StorySelector from "../../components/StorySelector/StorySelector.vue";
import StoryReaderMain from "./StoryReaderMain.vue";
import { computed } from "vue";
export default {
  props: ["storyType", "storyId", "storyIndex", "server"],
  async created() {
    this.loading = true;
    await this.getStoryTable();
    await this.getCharacterSpritesTable();
    this.loading = false;
  },
  data() {
    return {
      loading: true,
      storyTable: {},
      charactersSprites: {},
      storyFile: {
        file: "",
        server: "",
      },
    };
  },
  provide() {
    return {
      charactersSprites: computed(() => this.charactersSprites),
    };
  },
  methods: {
    async getStoryTable() {
      await fetch(`${assetUrl}/table/story_review_table.json`)
        .then((response) => response.json())
        .then((data) => {
          this.storyTable = data;
        });
    },
    async getCharacterSpritesTable() {
      await fetch(`${assetUrl}/table/characters_sprites_table.json`)
        .then((response) => response.json())
        .then((data) => {
          this.charactersSprites = data;
        });
    },
    selectFile({ file, server }) {
      this.storyFile = {
        file,
        server,
      };
    },
  },

  components: { StorySelector, StoryReaderMain },
};
</script>
