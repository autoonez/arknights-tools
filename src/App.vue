<template>
  <v-app class="app">
    <v-app-bar density="compact">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Arknights Tools</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-list-item to="/">Home</v-list-item>
        <v-list-item to="/story-reader/">Story Reader</v-list-item>
        <v-list-item to="/material-planner/">Material Planner</v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    drawer: false,
  }),
};
</script>

<style scoped>
.app {
  min-height: 100vh;
}
</style>
