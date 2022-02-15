<template>
  <div class="pa-3">
    <p v-for="(text, index) in line.params.text" :key="index">{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: ["line"],
};
</script>
