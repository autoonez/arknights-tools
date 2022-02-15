<template>
  <v-progress-linear indeterminate v-if="!isReady"></v-progress-linear>
  <v-container>
    <RenderBlock
      v-for="(renderBlock, index) of renderBlocks"
      :key="index"
      :renderBlock="renderBlock"
    />
  </v-container>
</template>

<script>
import RenderBlock from "./RenderBlock.vue";
export default {
  props: ["storyData"],
  data() {
    return {
      isReady: false,
      renderBlocks: [],
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
    prepareRenderBlocks() {
      this.isReady = false;
      let renderBlocks = [];
      let renderBlock = [];
      let lastLine;
      let lastDecision;
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
          case "CHARACTER_SPEECH": {
            if (!lastLine) {
              lastLine = {
                tag: "CHARACTER_SPEECH",
                params: {
                  ...line.params,
                  text: [line.params.text],
                },
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
                  params: {
                    ...line.params,
                    text: [line.params.text],
                  },
                };
              }
            }
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
          default: {
            break;
          }
        }
      }
      if (renderBlock[renderBlock.length - 1] !== lastLine)
        renderBlock.push(lastLine);
      if (renderBlocks[renderBlocks.length - 1] !== renderBlock)
        renderBlocks.push(renderBlock);
      this.renderBlocks = renderBlocks;
      this.isReady = true;
    },
  },
  components: { RenderBlock },
};
</script>
