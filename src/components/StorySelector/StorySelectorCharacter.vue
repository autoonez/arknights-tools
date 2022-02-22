<template>
  <v-container>
    <v-list>
      <template v-for="(storySet, i) in storyList" :key="i">
        <v-list-item
          v-if="server in storySet.name"
          :prepend-avatar="getImageSrc(storySet.character.id)"
          @click="this.$emit('SELECT_STORY_ID', storySet.id)"
          :title="storySet.character.name[server]"
          :subtitle="storySet.name[server]"
        >
        </v-list-item>
      </template>
    </v-list>
  </v-container>
</template>

<script>
import { assetUrl } from "../../constants/url";
export default {
  props: ["storyList", "server"],
  emits: ["SELECT_STORY_ID"],
  methods: {
    getImageSrc(id) {
      return `${assetUrl}/images/avatar/${id}.png`;
    },
  },
};
</script>
