<template>
  <v-dialog>
    <v-card>
      <v-list>
        <v-list-item
          v-for="(sheet, index) in sheets"
          @click="$emit('select', index)"
          :title="sheet"
        ></v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  sheets: string[];
}>();
const emit = defineEmits(["select"]);
</script>
