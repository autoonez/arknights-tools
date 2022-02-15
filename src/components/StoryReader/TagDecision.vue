<template>
  <div class="d-flex flex-column pa-3">
    <v-btn
      v-for="(option, index) in line.params.options"
      :key="index"
      :variant="getVariant(option.value)"
      @click="selectDecision(option.value)"
      >{{ option.text }}</v-btn
    >
  </div>
</template>

<script>
export default {
  props: ["line", "decision"],
  emits: ["selectDecision"],
  methods: {
    getVariant(value) {
      let variant = "text";
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
