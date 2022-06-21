<template>
  <MaterialInput
    :itemId="itemId"
    :modelValue="number"
    :min="min"
    :max="max"
    @update:modelValue="
      (value) =>
        this.$emit('update', {
          itemId,
          oldValue: number,
          newValue: value,
        })
    "
  />
</template>

<script>
import MaterialInput from "./MaterialInput.vue";
export default {
  name: "MaterialExpItem",
  props: ["itemId", "number", "min", "max"],
  emits: ["update"],
  data() {
    return {};
  },
  components: { MaterialInput },
};
</script>
