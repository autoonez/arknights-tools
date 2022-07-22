<template>
  <ItemWithNumber v-if="number > 0" :item-id="itemId" :number="number" />
</template>

<script>
import ItemWithNumber from "../ItemWithNumber.vue";
export default {
  name: "MaterialItem",
  props: ["itemId", "requireFromCharacter", "requireFromCrafting", "crafting"],
  computed: {
    current() {
      return this.$store.state.materialPlanner.currentItem[this.itemId] || 0;
    },
    number() {
      return (
        (this.requireFromCharacter || 0) +
        (this.requireFromCrafting || 0) -
        this.current -
        (this.crafting || 0)
      );
    },
  },
  components: { ItemWithNumber },
};
</script>
