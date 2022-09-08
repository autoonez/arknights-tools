<template>
  <v-dialog>
    <v-card>
      <v-list>
        <v-list-item
          v-for="lang in languageOptions"
          :key="lang.id"
          @click="$emit('selectLanguage', lang.id)"
        >
          {{ lang.name }}
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { languageList } from "../constants";

export default defineComponent({
  name: "LanguageSelectorDialog",
  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["selectLanguage"],
  setup(props) {
    const languageOptions = computed(() =>
      languageList.filter((lang) => props.options?.includes(lang.id))
    );
    return {
      languageOptions,
    };
  },
});
</script>
