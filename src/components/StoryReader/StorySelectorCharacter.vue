<template>
  <div class="character-container">
    <template v-for="(character, index) in operators" :key="index">
      <OperatorCard
        :characterId="character.id"
        :characterName="
          character.name[language] ||
          character.appellation ||
          character.name['zh_CN']
        "
        @click="selectCharacter(character.id)"
      />
    </template>
  </div>

  <CharStorySetListDialog
    v-model="dialog"
    :characterId="selectedCharacter"
    @selectStorySet="selectStorySet"
  />
</template>

<script lang="ts">
import { computed, defineComponent, provide, ref } from "vue";
import { useRouter } from "vue-router";
import { useCharactertore } from "../../stores/CharacterStore";
import { useStoryReaderStore } from "../../stores/StoryReaderStore";
import { useStoryTableStore } from "../../stores/StoryTableStore";
import OperatorCard from "../OperatorCard.vue";
import CharStorySetListDialog from "./CharStorySetListDialog.vue";

export default defineComponent({
  name: "StorySelectorCharacter",
  components: { OperatorCard, CharStorySetListDialog },
  setup() {
    const store = useStoryReaderStore();
    const router = useRouter();
    const language = computed(() => store.language);
    const dialog = ref(false);
    const selectedCharacter = ref("");

    const { getStorySetByCharacterId } = useStoryTableStore();
    const { getOperators } = useCharactertore();
    const storySetByCharacterId = computed(() => getStorySetByCharacterId());

    const operators = getOperators().filter((char) =>
      storySetByCharacterId.value
        ? char.id in storySetByCharacterId.value
        : false
    );

    const selectCharacter = (charId: string) => {
      selectedCharacter.value = charId;
      dialog.value = true;
    };

    const selectStorySet = (storySetId: string) => {
      dialog.value = false;
      router.push({
        name: "select-story",
        query: {
          storySetId,
        },
      });
    };

    return {
      dialog,
      selectedCharacter,
      language,
      operators,
      selectCharacter,
      selectStorySet,
    };
  },
});
</script>

<style scoped>
.character-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, 64px);
  grid-row-gap: 16px;
  grid-column-gap: 16px;
  justify-content: center;
}
</style>
