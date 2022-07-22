<template>
  <v-btn height="48px" width="48px">
    <div class="d-flex">
      <img :src="imgSrc" class="w-100" />
    </div>
  </v-btn>
</template>

<script>
import { assetUrl } from "../constants/url";

export default {
  name: "OperatorClassIcon",
  props: ["classId"],
  computed: {
    imgSrc() {
      return `${assetUrl}/images/class/icon_profession_${this.classId.toLowerCase()}.png`;
    },
  },
};
</script>
