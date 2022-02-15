<template>
  <v-card>
    <v-list>
      <v-list-item
        link
        v-for="(type, i) in storyTypeList"
        :key="i"
        :to="'/story-reader/' + type.id"
      >
        <v-list-item-title v-text="type.name"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: ["storyTypeList"],
};
</script>
