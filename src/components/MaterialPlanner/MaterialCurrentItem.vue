<template>
  <MaterialInput
    :itemId="itemId"
    :modelValue="number"
    @update:modelValue="(value) => (number = value)"
  />
</template>

<script>
import MaterialInput from "./MaterialInput.vue";
import { CURRENT_ITEM_CHANGE } from "../../store/actions";
export default {
  name: "MaterialCurrentItem",
  props: ["itemId"],
  data() {
    return {};
  },
  computed: {
    number: {
      get() {
        return this.$store.state.materialPlanner.currentItem[this.itemId] || 0;
      },
      set(value) {
        this.$store.dispatch(CURRENT_ITEM_CHANGE, {
          itemId: this.itemId,
          value,
        });
      },
    },
  },
  components: { MaterialInput },
};
</script>
