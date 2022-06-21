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
  name: "CharacterSubClass",
  props: ["subClassId"],
  computed: {
    imgSrc() {
      return `${assetUrl}/images/sub-class/sub_${this.subClassId}_icon.png`;
    },
  },
};
</script>
