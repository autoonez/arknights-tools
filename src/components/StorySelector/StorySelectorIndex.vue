<template>
  <v-container>
    <v-list>
      <template v-for="(storyItem, i) in storyList" :key="i">
        <v-list-item
          v-if="server in storyItem.name"
          @click="this.$emit('SELECT_STORY_INDEX', storyItem.sort)"
        >
          <v-list-item-header>
            <v-list-item-title>{{ getStoryName(storyItem) }}</v-list-item-title>
          </v-list-item-header>
        </v-list-item>
      </template>
    </v-list>
  </v-container>
</template>

<script>
export default {
  props: ["storyList", "server"],
  emits: ["SELECT_STORY_INDEX"],
  methods: {
    getStoryName(storyItem) {
      return `${storyItem.code ? `${storyItem.code}: ` : ``}${
        storyItem.name[this.server]
      }`;
    },
  },
};
</script>
