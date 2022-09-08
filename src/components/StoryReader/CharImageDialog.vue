<template>
  <v-dialog v-model="show" class="custom-overlay" @click="$emit('closeDialog')">
    <v-img :src="imageSrc" />
  </v-dialog>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "CharImageDialog",
  emits: ["closeDialog"],
  props: {
    imageSrc: String,
  },
  setup(props) {
    const show = computed(() => !!props.imageSrc);
    return {
      show,
    };
  },
});
</script>

<style>
.custom-overlay > .v-overlay__content {
  width: 100%;
  height: 100%;
}
</style>
