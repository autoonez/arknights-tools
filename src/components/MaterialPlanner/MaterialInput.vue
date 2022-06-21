<template>
  <v-card max-width="64px" class="rounded-0">
    <div class="current-item-img-wrap">
      <div class="v-responsive v-img">
        <img :src="imgSrc" class="v-img__img v-img__img--contain" />
      </div>
    </div>

    <input
      type="number"
      :min="min || 0"
      :max="max"
      v-model="input"
      class="current-item-input-label"
    />
  </v-card>
</template>

<script>
import { assetUrl } from "../../constants/url";

export default {
  name: "MaterialInput",
  props: ["itemId", "modelValue", "max", "min"],
  computed: {
    material() {
      return this.$store.state.item.itemDataById[this.itemId];
    },
    imgSrc() {
      return `${assetUrl}/images/items/${this.material.iconId}.png`;
    },
    input: {
      get() {
        return this.modelValue || 0;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>

<style scoped>
.current-item-img-wrap {
  display: flex;
  height: 64px;
  width: 64px;
}
.current-item-input-label {
  width: 100%;
  text-align: right;
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
  background: rgb(var(--v-theme-on-surface-variant));
}
</style>
