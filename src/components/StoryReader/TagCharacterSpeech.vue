<template>
  <v-row>
    <v-col cols="12" sm="2" class="pb-0 pb-sm-3"
      ><p class="font-weight-bold text-grey">{{ line.params.name }}</p>
    </v-col>
    <v-col cols="12" sm="8" class="pt-0 pt-sm-3"
      ><p v-for="(text, index) in line.params.text" :key="index">
        {{ text }}
      </p></v-col
    >
  </v-row>
</template>

<script>
export default {
  props: ["line"],
};
</script>
