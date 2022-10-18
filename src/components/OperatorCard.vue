<template>
  <v-card max-width="64px" class="rounded-0">
    <div class="operator-card-img-wrap">
      <img :src="imgSrc" class="operator-card-img" />
    </div>
    <p class="operator-card-name">{{ characterName }}</p>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { assetUrl } from "../constants";

export default defineComponent({
  name: "OperatorCard",
  props: ["characterId", "characterName", "isSelected"],
  setup(props) {
    return {
      imgSrc: `${assetUrl}/images/avatar/${props.characterId}.webp`,
    };
  },
});
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
</style>
