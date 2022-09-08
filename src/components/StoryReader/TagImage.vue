<template>
  <v-img :src="imageSrc" class="my-3"></v-img>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { assetUrl } from "../../constants";

export default defineComponent({
  name: "TagImage",
  props: {
    line: Object as PropType<StoryLine>,
  },
  setup(props) {
    const imageSrc = computed(() => {
      let src = "";
      if (props.line?.params.image) {
        if (props.line?.tag === "IMAGE") {
          src = `${assetUrl}/images/avg/imgs/${props.line?.params.image}.png`;
        }
        if (props.line?.tag === "BACKGROUND") {
          src = `${assetUrl}/images/avg/bg/${props.line?.params.image}.png`;
        }
      } else {
        src = `${assetUrl}/images/avg/bg/bg_black.png`;
      }
      return src;
    });
    return {
      imageSrc,
    };
  },
});
</script>
