<template>
  <v-img :src="imageSrc" class="my-3"></v-img>
</template>

<script>
import { assetUrl } from "../../constants/url";

export default {
  props: ["line"],
  computed: {
    imageSrc() {
      let src = "";
      if (this.line.tag === "IMAGE")
        src = `${assetUrl}/images/avg/imgs/${this.line.params.image}.png`;
      if (this.line.tag === "BACKGROUND")
        src = `${assetUrl}/images/avg/bg/${this.line.params.image}.png`;
      if (!this.line.params.image)
        src = src = `${assetUrl}/images/avg/bg/bg_black.png`;
      return src;
    },
  },
};
</script>
