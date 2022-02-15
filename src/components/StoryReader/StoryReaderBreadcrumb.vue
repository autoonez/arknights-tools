<template>
  <v-banner>
    <v-btn variant="text" to="/story-reader/"><v-icon>mdi-home</v-icon></v-btn>
    <v-menu v-if="storyType">
      <template v-slot:activator="{ props }">
        <v-btn variant="text" v-bind="props">{{ storyType.name }}</v-btn>
      </template>
      <v-list>
        <v-list-item
          link
          v-for="type in storyTypeList"
          :key="type.id"
          :value="type"
          :to="'/story-reader/' + type.id"
        >
          <v-list-item-title>{{ type.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-banner>
</template>

<script>
export default {
  props: ["storyTypeList"],
  created() {
    this.$watch(
      () => this.$route.params.storySetType,
      () => {
        this.checkStoryType();
      },
      { immediate: true }
    );
  },
  data() {
    return {
      storyType: undefined,
    };
  },
  methods: {
    checkStoryType() {
      let storyType = this.storyTypeList.find(
        (type) => type.id === this.$route.params.storySetType
      );
      if (!storyType) {
        this.storyType = undefined;
        this.$router.push("/story-reader");
      }
      this.storyType = storyType;
    },
  },
};
</script>
