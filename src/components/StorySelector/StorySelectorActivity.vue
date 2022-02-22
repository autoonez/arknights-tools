<template>
  <v-container>
    <v-list>
      <template v-for="(storySet, i) in storyList" :key="i">
        <v-list-item
          v-if="server in storySet.name"
          :prepend-avatar="getImageSrc(storySet.entryPic)"
          @click="this.$emit('SELECT_STORY_ID', storySet.id)"
        >
          <v-list-item-header>
            <v-list-item-title>{{ storySet.name[server] }}</v-list-item-title>
          </v-list-item-header>
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
    getImageSrc(entryPic) {
      return `${assetUrl}/images/storyEntryPic/activity/${entryPic}.png`;
    },
  },
};
</script>
