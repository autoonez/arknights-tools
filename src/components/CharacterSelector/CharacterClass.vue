<template>
  <v-btn class="character-class-icon" height="56px" width="56px">
    <div class="d-flex">
      <img :src="imgSrc" />
    </div>
  </v-btn>
</template>

<script>
import { assetUrl } from "../../constants/url";

export default {
  name: "CharacterClass",
  props: ["classId"],
  computed: {
    imgSrc() {
      return `${assetUrl}/images/class/icon_profession_${this.classId}_large.png`;
    },
  },
};
</script>

<style>
.character-class-icon {
  background: black;
  border-radius: 0;
  margin: 0;
}

.character-class-icon img {
  width: 100%;
  height: 100%;
}
</style>
