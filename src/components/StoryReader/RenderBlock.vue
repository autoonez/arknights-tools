<template>
  <template v-for="(line, index) in renderBlock" :key="index">
    <TagDescription
      v-if="line.tag === 'DESCRIPTION'"
      :line="line"
      v-show="lineIndexsToShow.includes(index)"
    />
    <TagSticker
      v-if="line.tag === 'STICKER'"
      :line="line"
      v-show="lineIndexsToShow.includes(index)"
    />
    <TagSubtitle
      v-else-if="line.tag === 'SUBTITLE'"
      :line="line"
      v-show="lineIndexsToShow.includes(index)"
    />
    <TagCharacterSpeech
      v-else-if="line.tag === 'DIALOG'"
      :line="line"
      v-show="lineIndexsToShow.includes(index)"
      @select-char-image="
        (value) => {
          $emit('selectCharImage', value);
        }
      "
    />
    <TagDecision
      v-else-if="line.tag === 'DECISION'"
      :line="line"
      v-show="lineIndexsToShow.includes(index)"
      :decision="decisionByLineIndex[index]"
      @select-decision="
        (value) => {
          selectDecision({
            id: index,
            value,
          });
        }
      "
    />
    <TagImage
      v-else-if="['IMAGE', 'BACKGROUND'].includes(line.tag)"
      :line="line"
      v-show="lineIndexsToShow.includes(index)"
    />
  </template>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive } from "vue";
import TagDescription from "./TagDescription.vue";
import TagSubtitle from "./TagSubtitle.vue";
import TagCharacterSpeech from "./TagCharacterSpeech.vue";
import TagDecision from "./TagDecision.vue";
import TagImage from "./TagImage.vue";
import TagSticker from "./TagSticker.vue";

export default defineComponent({
  name: "RenderBlock",
  emits: ["selectCharImage"],
  props: {
    renderBlock: {
      type: [Object] as PropType<StoryLine[]>,
      default: [],
    },
  },
  setup(props) {
    const decisionByLineIndex: {
      [lineIndex: number]: number;
    } = reactive({});
    const selectDecision = ({ id, value }: { id: number; value: string }) => {
      decisionByLineIndex[id] = parseInt(value);
    };

    const lineIndexsToShow = computed(() => {
      let indexs: number[] = [];
      let decision;
      for (let i = 0; i < props.renderBlock.length; i++) {
        let line = props.renderBlock[i];
        switch (line.tag) {
          case "DECISION": {
            decision =
              decisionByLineIndex[i] ||
              parseInt(line.params.options[0]["value"]);
            indexs.push(i);
            break;
          }
          case "PREDICATE": {
            let references: string[] = line.params.references;
            if (decision) {
              //if this predicate references not include selected decision option
              //then skip to next predicate
              if (!references.includes(decision.toString())) {
                for (
                  let nextLineIndex = i + 1;
                  nextLineIndex < props.renderBlock.length;
                  nextLineIndex++
                ) {
                  let nextLine = props.renderBlock[nextLineIndex];
                  //if found next predicate break loop immediately
                  if (nextLine.tag === "PREDICATE") {
                    i = nextLineIndex - 1;
                    break;
                  } else {
                    //if next line is the last line break loop
                    if (nextLineIndex === props.renderBlock.length - 1) {
                      i = nextLineIndex;
                      break;
                    }
                  }
                }
              }
            } else {
              decision = null;
            }
            break;
          }
          //if current line is not DECISION or PREDICATE just show it normally
          default: {
            indexs.push(i);
            break;
          }
        }
      }
      return indexs;
    });
    return {
      decisionByLineIndex,
      selectDecision,
      lineIndexsToShow,
    };
  },
  components: {
    TagDescription,
    TagSubtitle,
    TagCharacterSpeech,
    TagDecision,
    TagImage,
    TagSticker
},
});
</script>
