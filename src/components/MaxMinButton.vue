<template>
  <v-menu offset-y>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" variant="outlined"> SET </v-btn>
    </template>
    <v-list>
      <v-list-item @click="this.$emit('set', 'MAX')">
        <v-list-item-title>MAX</v-list-item-title>
      </v-list-item>
      <v-list-item @click="this.$emit('set', 'MIN')">
        <v-list-item-title>MIN</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "MaxMinButton",
  emits: ["set"],
};
</script>
