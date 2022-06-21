<template>
  <StoryReaderRenderItem
    v-for="(item, index) in items"
    :key="index"
    :line="item"
    :decision="decision"
    @selectDecision="selectDecision"
    @selectCharImage="selectCharImage"
  />
</template>

<script>
import StoryReaderRenderItem from "./StoryReaderRenderItem.vue";
export default {
  props: ["renderBlock"],
  emits: ["selectCharImage"],
  data() {
    return {
      decision: {},
    };
  },
  methods: {
    selectDecision({ id, value }) {
      this.decision[id] = value;
    },
    selectCharImage(image) {
      this.$emit("selectCharImage", image);
    },
  },
  computed: {
    items() {
      let items = [];
      let decisionId = 1;
      let decision;
      for (let i = 0; i < this.renderBlock.length; i++) {
        let item = this.renderBlock[i];

        switch (item.tag) {
          case "DECISION": {
            decision =
              this.decision[decisionId] || item.params.options[0]["value"];
            item.params.id = decisionId;
            items.push(item);
            decisionId += 1;
            break;
          }
          case "PREDICATE": {
            let references = item.params.references;
            if (decision) {
              if (!references.includes(decision)) {
                for (
                  let nextLine = i + 1;
                  nextLine < this.renderBlock.length;
                  nextLine++
                ) {
                  let nextItem = this.renderBlock[nextLine];
                  if (nextItem.tag === "PREDICATE") {
                    i = nextLine - 1;
                    break;
                  } else {
                    if (nextLine === this.renderBlock.length - 1) {
                      i = nextLine;
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
          default: {
            items.push(item);
            break;
          }
        }
      }
      return items;
    },
  },
  components: { StoryReaderRenderItem },
};
</script>
