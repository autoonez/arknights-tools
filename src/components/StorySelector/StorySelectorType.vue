<template>
  <v-list>
    <v-list-item
      v-for="(type, index) in typeList"
      :key="index"
      @click="$emit('select', type.id)"
      :title="type.name"
    >
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
const props = defineProps<{
  typeList: {
    id: string;
    routeName: string;
    name: string;
  }[];
}>();
const emit = defineEmits(["select"]);
</script>
