import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import { HTTP } from "../services/http-service";

export const useCharacterSpriteTableStore = defineStore(
  "CharacterSpriteTable",
  () => {
    const characterSpriteTable: Ref<CharacterSpriteTable | undefined> = ref();

    const getCharacterSpriteTable = async () => {
      if (!characterSpriteTable.value) {
        characterSpriteTable.value = await HTTP.get(
          "/table/characters_sprites_table.json"
        ).then((response) => response.data);
      }
    };

    return {
      characterSpriteTable,
      getCharacterSpriteTable,
    };
  }
);
