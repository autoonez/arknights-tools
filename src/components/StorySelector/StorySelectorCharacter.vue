<template>
  <v-progress-linear indeterminate v-show="loading"></v-progress-linear>
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

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useCharactertore } from "../../stores/CharacterStore";
import { useStoryTableStore } from "../../stores/StoryTableStore";
import OperatorCard from "../OperatorCard.vue";
import CharStorySetListDialog from "../StoryReader/CharStorySetListDialog.vue";

const props = defineProps<{
  language: string;
}>();
const emit = defineEmits<{
  (e: "select", storySetId: string): void;
}>();

const loading = ref(true);
const dialog = ref(false);

const selectedCharacter = ref("");
const selectCharacter = (charId: string) => {
  selectedCharacter.value = charId;
  dialog.value = true;
};

const { getStorySetByCharacterId } = useStoryTableStore();
const { getOperators, getCharacterTable } = useCharactertore();
const storySetByCharacterId = computed(() => getStorySetByCharacterId());

const operators = computed(() =>
  getOperators().filter((char) =>
    storySetByCharacterId.value ? char.id in storySetByCharacterId.value : false
  )
);

const selectStorySet = (storySetId: string) => {
  dialog.value = false;
  emit("select", storySetId);
};

onMounted(async () => {
  await getCharacterTable();
  loading.value = false;
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
