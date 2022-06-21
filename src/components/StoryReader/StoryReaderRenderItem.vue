<template>
  <TagDescription :line="line" v-if="line.tag === 'DESCRIPTION'" />
  <TagSubtitle :line="line" v-else-if="line.tag === 'SUBTITLE'" />
  <TagCharacterSpeech
    :line="line"
    v-else-if="line.tag === 'CHARACTER_SPEECH'"
  />
  <TagDecision
    :line="line"
    :decision="decision"
    v-else-if="line.tag === 'DECISION'"
    @selectDecision="selectDecision"
  />
  <TagImage
    :line="line"
    v-else-if="['IMAGE', 'BACKGROUND'].includes(line.tag)"
  />
</template>

<script>
import TagDescription from "./TagDescription.vue";
import TagCharacterSpeech from "./TagCharacterSpeech.vue";
import TagDecision from "./TagDecision.vue";
import TagImage from "./TagImage.vue";
import TagSubtitle from "./TagSubtitle.vue";
export default {
  props: ["line", "decision"],
  emits: ["selectDecision"],
  methods: {
    selectDecision(value) {
      this.$emit("selectDecision", value);
    },
  },
  components: {
    TagDescription,
    TagCharacterSpeech,
    TagDecision,
    TagImage,
    TagSubtitle,
  },
};
</script>
