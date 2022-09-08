<template>
  <v-dialog>
    <v-card>
      <v-list>
        <v-list-item
          v-for="(storySet, index) in storySetList"
          :key="index"
          @click="$emit('selectStorySet', storySet.id)"
        >
          <v-list-item-title>
            {{ storySet.name[language] || storySet.name["zh_CN"] }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStoryReaderStore } from "../../stores/StoryReaderStore";
import { useStoryTableStore } from "../../stores/StoryTableStore";

export default defineComponent({
  name: "CharStorySetListDialog",
  props: ["characterId"],
  emits: ["selectStorySet"],
  setup(props, { emit }) {
    const store = useStoryReaderStore();
    const language = computed(() => store.language);
    const { getCharacterStorySet } = useStoryTableStore();
    const storySetList = computed(() =>
      getCharacterStorySet(props.characterId)
    );

    return {
      language,
      storySetList,
    };
  },
});
</script>
