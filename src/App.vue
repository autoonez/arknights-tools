<template>
  <v-app>
    <v-app-bar density="compact">
      <v-app-bar-title>Arknights Tools</v-app-bar-title>
      <v-divider inset vertical></v-divider>
      <v-btn variant="text" to="/">Home</v-btn>
      <v-btn variant="text" to="/story-reader/">Story Reader</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
