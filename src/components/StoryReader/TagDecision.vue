<template>
  <v-row dense class="my-3">
    <v-col
      cols="12"
      v-for="(option, index) in line?.params.options"
      :key="index"
    >
      <v-btn
        class="float-right text-right decision-option"
        :variant="getVariant(option.value)"
        @click="$emit('selectDecision', option.value)"
        >{{ option.text }}</v-btn
      >
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "TagDecision",
  props: {
    line: Object as PropType<StoryLine>,
    decision: Number,
  },
  emits: ["selectDecision"],
  setup(props) {
    const getVariant = (value: string): "elevated" | "outlined" => {
      let variant: "elevated" | "outlined" = "elevated";
      let id = props.decision || parseInt(props.line?.params.options[0].value);
      if (id === parseInt(value)) {
        variant = "outlined";
      }
      return variant;
    };
    return {
      getVariant,
    };
  },
});
</script>

<style>
.decision-option {
  height: auto !important;
}
.decision-option > .v-btn__content {
  white-space: unset;
  padding: 8px;
}
</style>
