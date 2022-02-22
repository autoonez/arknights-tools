<template>
  <v-row dense>
    <v-col
      cols="12"
      v-for="(option, index) in line.params.options"
      :key="index"
    >
      <v-btn
        class="float-right text-right"
        :variant="getVariant(option.value)"
        @click="selectDecision(option.value)"
        >{{ option.text }}</v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["line", "decision"],
  emits: ["selectDecision"],
  methods: {
    getVariant(value) {
      let variant = "contained";
      let id =
        this.decision[this.line.params.id] || this.line.params.options[0].value;
      if (id === value) {
        variant = "outlined";
      }
      return variant;
    },
    selectDecision(value) {
      this.$emit("selectDecision", {
        id: this.line.params.id,
        value,
      });
    },
  },
};
</script>
