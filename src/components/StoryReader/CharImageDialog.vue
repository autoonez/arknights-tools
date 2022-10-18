<template>
  <v-dialog v-model="show" class="custom-overlay" @click="$emit('closeDialog')">
    <v-img :src="imageSrc" />
  </v-dialog>
</template>

<script lang="ts">
import mergeImages from "merge-images";
import { computed, defineComponent, Ref, ref, watch } from "vue";
import { assetUrl } from "../../constants";
import { getCharNameAndNumFromSpriteName } from "../../services/story-service";
import { useCharacterSpriteTableStore } from "../../stores/CharacterSpriteTableStore";

export default defineComponent({
  name: "CharImageDialog",
  emits: ["closeDialog"],
  props: {
    charImage: String,
  },
  setup(props) {
    const { characterSpriteTable } = useCharacterSpriteTableStore();

    const charImageSrcMap: Ref<{
      [charImage: string]: string;
    }> = ref({});

    const show = ref(false);
    const imageSrc = ref("");

    watch(
      () => props.charImage,
      async () => {
        if (props.charImage) {
          if (charImageSrcMap.value[props.charImage]) {
            show.value = true;
            imageSrc.value = charImageSrcMap.value[props.charImage];
          } else {
            if (characterSpriteTable) {
              let url = "";
              let file;
              let { name, num, group } = getCharNameAndNumFromSpriteName(
                props.charImage
              );
              name = name.toLowerCase();
              num = num.trim();
              group = group.trim();
              let charSpriteHub = characterSpriteTable[name];

              if (charSpriteHub[group]["sprites"][num]["isWholeBody"] === 0) {
                let baseNum = Object.keys(charSpriteHub[group]["sprites"])[
                  Object.keys(charSpriteHub[group]["sprites"]).length - 1
                ];
                if (baseNum !== num) {
                  let baseFile =
                    charSpriteHub[group]["sprites"][baseNum]["sprite"];
                  let baseSrc = `${assetUrl}/images/avg/characters/${name}/${baseFile}`;

                  let faceFile = charSpriteHub[group]["sprites"][num]["sprite"];
                  let faceSrc = `${assetUrl}/images/avg/characters/${name}/${faceFile}`;

                  url = await mergeImages(
                    [
                      {
                        src: baseSrc,
                        x: 0,
                        y: 0,
                      },
                      {
                        src: faceSrc,
                        x: charSpriteHub[group]["facePos"]["x"],
                        y: charSpriteHub[group]["facePos"]["y"],
                      },
                    ],
                    {
                      crossOrigin: "anonymous",
                      format: "image/webp",
                    }
                  );
                }
              } else {
                file = charSpriteHub[group]["sprites"][num]["sprite"];
                url = `${assetUrl}/images/avg/characters/${name}/${file}`;
              }

              charImageSrcMap.value[props.charImage] = url;
              imageSrc.value = url;
              show.value = true;
            }
          }
        } else {
          show.value = false;
        }
      }
    );

    return {
      show,
      imageSrc,
    };
  },
});
</script>

<style>
.custom-overlay > .v-overlay__content {
  width: 100%;
  height: 100%;
}
</style>
