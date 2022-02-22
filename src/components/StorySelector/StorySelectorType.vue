<template>
  <v-container>
    <v-list>
      <v-list-item
        v-for="(type, index) in storyTypeList"
        :key="index"
        @click="this.$emit('SELECT_TYPE', type.id)"
      >
        <v-list-item-title>{{ type.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import { storyType } from "../../constants/story";
export default {
  emits: ["SELECT_TYPE"],
  data() {
    return {
      storyTypeList: storyType,
    };
  },
};
</script>
