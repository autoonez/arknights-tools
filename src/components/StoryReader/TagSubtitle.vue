<template>
  <v-card class="my-3">
    <v-card-text
      class="text-center"
      style="font-size: 1rem; line-height: 1.5rem"
    >
      <p v-for="(text, index) in line.params.text" :key="index">
        {{ text }}
      </p></v-card-text
    >
  </v-card>
</template>

<script>
export default {
  props: ["line"],
};
</script>
