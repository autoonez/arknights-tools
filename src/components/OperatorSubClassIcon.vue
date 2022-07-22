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
  name: "OperatorSubClassIcon",
  props: ["subClassId"],
  computed: {
    imgSrc() {
      return `${assetUrl}/images/sub-class/sub_${this.subClassId}_icon.png`;
    },
  },
};
</script>
