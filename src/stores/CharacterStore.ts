import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { HTTP } from "../services/http-service";

export const useCharactertore = defineStore("CharacterStore", () => {
  const characterTable: Ref<CharacterData[]> = ref([]);

  const getCharacterTable = async () => {
    if (characterTable.value.length === 0) {
      characterTable.value = await HTTP.get("/table/character_table.json").then(
        (response) => response.data
      );
    }
  };

  const getOperators = () => {
    if (characterTable.value.length > 0) {
      return characterTable.value.filter(
        (char) =>
          !["TRAP", "TOKEN"].includes(char.profession) && !char.isNotObtainable
      );
    } else {
      return [];
    }
  };

  return {
    characterTable,
    getCharacterTable,
    getOperators,
  };
});
