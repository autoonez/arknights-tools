<template>
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { storyType } from "../../constants";

export default defineComponent({
  name: "StorySelectorType",
  setup() {
    return { storyType };
  },
});
</script>
