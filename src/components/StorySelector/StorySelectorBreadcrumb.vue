<template>
  <v-btn
    variant="text"
    :class="{
      'd-none': type === 'preview',
      'd-none d-sm-inline-flex': type !== 'preview',
    }"
    @click="this.$emit('SELECT_HOME')"
    ><v-icon>mdi-home</v-icon></v-btn
  >
  <v-btn
    variant="text"
    :class="{
      'd-none d-sm-inline-flex':
        type === 'preview' ||
        (type !== 'preview' && stage !== 'SELECT_STORY_ID'),
    }"
    v-if="items.type"
    @click="this.$emit('SELECT_TYPE', items.type.id)"
    >{{ items.type.name }}</v-btn
  >
  <v-btn
    variant="text"
    :class="{
      'd-none d-sm-inline-flex':
        type === 'preview' ||
        (type !== 'preview' && stage !== 'SELECT_STORY_INDEX'),
    }"
    v-if="items.episode"
    @click="this.$emit('SELECT_STORY_ID', items.episode.id)"
    >{{ items.episode.name[server] }}</v-btn
  >

  <v-btn
    variant="text"
    v-if="items.story"
    :class="{
      'd-none d-sm-inline-flex': type !== 'preview',
    }"
    >{{ getStoryName(items.story) }}</v-btn
  >
</template>

<script>
export default {
  props: ["items", "server", "type", "stage"],
  emits: ["SELECT_HOME", "SELECT_TYPE", "SELECT_STORY_ID"],
  methods: {
    getStoryName(story) {
      return `${story.code ? `${story.code}: ` : ``}${story.name[this.server]}`;
    },
  },
};
</script>
