<template>
  <v-progress-linear indeterminate v-if="!isReady"></v-progress-linear>
  <v-container>
    <RenderBlock
      v-for="(renderBlock, index) of renderBlocks"
      :key="index"
      :renderBlock="renderBlock"
      @selectCharImage="selectCharImage"
    />
  </v-container>
  <CharImageDialog
    v-model="charImageDialog"
    :src="charImageSrc"
    @set="charImageDialog = false"
  />
</template>

<script>
import { assetUrl } from "../../constants/url";
import RenderBlock from "./RenderBlock.vue";
import CharImageDialog from "./CharImageDialog.vue";
import mergeImages from "merge-images";
export default {
  props: ["storyData"],
  inject: ["charactersSprites"],
  data() {
    return {
      isReady: false,
      renderBlocks: [],
      imagesUrl: {},
      charImageSrc: "",
      charImageDialog: false,
    };
  },
  created() {
    this.$watch(
      () => this.storyData,
      () => {
        this.prepareRenderBlocks();
      },
      { immediate: true }
    );
  },
  methods: {
    getCharNameAndNumFromSpriteName(SpriteName) {
      let num = "1";
      let group = "1";
      let name = "";
      if (SpriteName.split("#").length > 1) {
        [name, num] = SpriteName.split("#");
        [num, group] = num.split("$");
      } else {
        name = SpriteName.split("#")[0];
      }
      return {
        name,
        num,
        group: group ? group : "1",
      };
    },
    async prepareRenderBlocks() {
      this.isReady = false;
      let renderBlocks = [];
      let renderBlock = [];
      let lastLine;
      let lastDecision;
      let charImage;
      let imagesUrl = {
        IMAGE: {},
        BACKGROUND: {},
        CHARACTER: {},
      };
      for (let i = 0; i < this.storyData.lines.length; i++) {
        let line = this.storyData.lines[i];
        switch (line.tag) {
          case "DESCRIPTION": {
            if (!lastLine) {
              lastLine = {
                tag: "DESCRIPTION",
                params: {
                  text: [line.params.text],
                },
              };
            } else {
              if (lastLine.tag === "DESCRIPTION") {
                lastLine.params.text.push(line.params.text);
              } else {
                renderBlock.push(lastLine);
                lastLine = {
                  tag: "DESCRIPTION",
                  params: {
                    text: [line.params.text],
                  },
                };
              }
            }
            break;
          }
          case "SUBTITLE": {
            if (line.params.text) {
              if (!lastLine) {
                lastLine = {
                  tag: "SUBTITLE",
                  params: {
                    text: [line.params.text],
                  },
                };
              } else {
                if (lastLine.tag === "SUBTITLE") {
                  lastLine.params.text.push(line.params.text);
                } else {
                  renderBlock.push(lastLine);
                  lastLine = {
                    tag: "SUBTITLE",
                    params: {
                      text: [line.params.text],
                    },
                  };
                }
              }
            }
            break;
          }
          case "CHARACTER_SPEECH": {
            let params = {
              ...line.params,
              text: [line.params.text],
              image: charImage,
            };
            if (!lastLine) {
              lastLine = {
                tag: "CHARACTER_SPEECH",
                params,
              };
            } else {
              if (
                lastLine.tag === "CHARACTER_SPEECH" &&
                lastLine.params?.name.localeCompare(
                  line.params.name,
                  undefined,
                  { sensitivity: "base" }
                ) === 0
              ) {
                lastLine.params.text.push(line.params.text);
              } else {
                renderBlock.push(lastLine);
                lastLine = {
                  tag: "CHARACTER_SPEECH",
                  params,
                };
              }
            }
            break;
          }
          case "MULTILINE": {
            let thisLine = {
              tag: "CHARACTER_SPEECH",
              params: {
                ...line.params,
                text: [line.params.other],
                image: charImage,
              },
            };

            if (lastLine) {
              renderBlock.push(lastLine);
            }
            lastLine = thisLine;
            break;
          }
          case "DECISION": {
            if (lastLine) {
              renderBlock.push(lastLine);
            }
            let options = line.params.options.split(";");
            let values = line.params.values.split(";");
            let isNewDecision = false;
            if (lastDecision) {
              for (let value of values) {
                if (lastDecision.options.includes(value)) {
                  isNewDecision = true;
                  break;
                }
              }
            }
            if (isNewDecision) {
              renderBlocks.push(renderBlock);
              renderBlock = [];
              lastLine = null;
            }
            if (!lastDecision || isNewDecision)
              lastDecision = {
                options: values,
              };
            lastLine = {
              ...line,
              params: {
                options: options.map((option, index) => ({
                  text: option,
                  value: values[index],
                })),
              },
            };
            break;
          }
          case "PREDICATE": {
            if (lastLine) {
              renderBlock.push(lastLine);
            }
            let references = line.params.references.split(";");
            lastLine = {
              ...line,
              params: {
                references,
              },
            };
            break;
          }
          case "IMAGE": {
            if (lastLine) {
              renderBlock.push(lastLine);
            }
            lastLine = line;
            break;
          }
          case "BACKGROUND": {
            if (lastLine) {
              renderBlock.push(lastLine);
            }
            lastLine = line;
            break;
          }
          case "CHARACTER": {
            if (line.params.focus) {
              switch (parseInt(line.params.focus)) {
                case 1: {
                  charImage = line.params.name;
                  break;
                }
                case 2: {
                  charImage = line.params.name2;
                  break;
                }
                default: {
                  charImage = undefined;
                  break;
                }
              }
            } else {
              charImage = line.params.name;
            }
            break;
          }
          default: {
            break;
          }
        }
        if (["IMAGE", "BACKGROUND", "CHARACTER"].includes(line.tag)) {
          if (["IMAGE", "BACKGROUND"].includes(line.tag)) {
            if (line.params.image) {
              if (!(line.params.image in imagesUrl[line.tag])) {
                let image = new Image();
                let url;
                if (line.tag === "IMAGE") {
                  url = `${assetUrl}/images/avg/imgs/${line.params.image}.png`;
                }
                if (line.tag === "BACKGROUND") {
                  url = `${assetUrl}/images/avg/bg/${line.params.image}.png`;
                }
                image.src = url;
                imagesUrl[line.tag][line.params.image] = url;
              }
            }
          }
          if (line.tag === "CHARACTER") {
            if (!(charImage in imagesUrl["CHARACTER"]) && charImage) {
              let url;
              let file;
              let { name, num, group } =
                this.getCharNameAndNumFromSpriteName(charImage);
              name = name.toLocaleLowerCase();
              num = num.trim();
              group = group.trim();
              let charSpriteHub = this.charactersSprites[name];
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
                      crossOrigin: "Anonymous",
                    }
                  );
                }
              } else {
                file = charSpriteHub[group]["sprites"][num]["sprite"];
                url = `${assetUrl}/images/avg/characters/${name}/${file}`;
              }
              imagesUrl["CHARACTER"][charImage] = url;
            }
          }
        }
      }
      if (renderBlock[renderBlock.length - 1] !== lastLine)
        renderBlock.push(lastLine);
      if (renderBlocks[renderBlocks.length - 1] !== renderBlock)
        renderBlocks.push(renderBlock);
      this.renderBlocks = renderBlocks;
      this.imagesUrl = imagesUrl;
      this.isReady = true;
    },
    selectCharImage(image) {
      if (image) {
        this.charImageSrc = this.imagesUrl["CHARACTER"][image];
        this.charImageDialog = true;
      }
    },
  },
  components: { RenderBlock, CharImageDialog },
};
</script>
