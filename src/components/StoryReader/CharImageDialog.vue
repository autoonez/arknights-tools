<template>
  <v-dialog
    v-model="show"
    width="100%"
    height="100%"
    class="custom-overlay"
    @click="show = false"
  >
    <v-img :src="src" />
  </v-dialog>
</template>

<script>
export default {
  props: ["value", "src"],
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("set", value);
      },
    },
  },
};
</script>

<style>
.custom-overlay > .v-overlay__content {
  width: 100%;
  height: 100%;
}
</style>
