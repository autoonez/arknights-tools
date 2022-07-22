<template>
  <v-card
    max-width="64px"
    :style="{ backgroundImage: `url(${imgSrc})` }"
    class="rounded-0 item"
  >
    <p class="item-number">{{ number || 0 }}</p>
  </v-card>
</template>

<script>
import { assetUrl } from "../constants/url";

export default {
  props: ["itemId", "number"],
  emits: ["selectItem"],
  computed: {
    imgSrc() {
      return `${assetUrl}/images/items/${
        this.$store.state.item.itemDataById[this.itemId].iconId
      }.png`;
    },
  },
  methods: {
    selectItem() {
      this.$emit("selectItem", this.itemId);
    },
  },
};
</script>

<style scoped>
.item {
  position: relative;
  width: 48px;
  height: 48px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
}
.item-number {
  padding: 4px;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: 0;
  right: 0;
  margin: auto;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
