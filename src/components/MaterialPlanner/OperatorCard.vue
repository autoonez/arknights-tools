<template>
  <v-card max-width="64px" class="rounded-0">
    <div class="operator-card-img-wrap">
      <img :src="imgSrc" class="operator-card-img" />
    </div>
    <p class="operator-card-name">{{ name }}</p>
    <div
      class="overlay-custom"
      :class="{
        'd-block': isSelected,
        'd-none': !isSelected,
      }"
    ></div>
  </v-card>
</template>

<script>
import { assetUrl } from "../../constants/url";

export default {
  props: ["id", "name", "isSelected"],
  emits: ["selectOperator"],
  computed: {
    imgSrc() {
      return `${assetUrl}/images/avatar/${this.id}.png`;
    },
  },
  methods: {
    selectOperator() {
      this.$emit("selectOperator", this.id);
    },
  },
};
</script>

<style scoped>
.operator-card-img {
  width: 100%;
}
.operator-card-img-wrap {
  display: flex;
}
.operator-card-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 4px;
  background: rgba(0, 0, 0, 0.5);
}
.overlay-custom {
  background-color: rgb(var(--v-theme-info));
  opacity: 0.5;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
