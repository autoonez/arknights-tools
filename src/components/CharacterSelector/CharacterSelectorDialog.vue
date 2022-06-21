<template>
  <v-dialog fullscreen scrollable persistent class="dialog">
    <v-card>
      <v-toolbar>
        <v-btn icon dark @click="save">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title
          >{{ selectedOperatorIds.length }} Selected</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn @click="save">Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text class="dialog-container">
        <v-card variant="outlined">
          <div class="bg-black">
            <v-btn-toggle
              v-model="filterClass"
              color="info"
              mandatory
              variant="outlined"
              divided
              class="character-class-list"
            >
              <v-btn
                class="character-class-icon"
                height="56px"
                width="56px"
                value="ALL"
              >
                All
              </v-btn>
              <CharacterClass
                v-for="(charClass, index) in operatorClasses"
                :key="index"
                :classId="charClass.classId"
                :value="charClass.classId"
            /></v-btn-toggle>
            <v-btn-toggle
              v-model="filterSubClass"
              color="info"
              mandatory
              variant="outlined"
              divided
              class="character-class-list"
            >
              <v-btn
                class="character-class-icon"
                height="56px"
                width="56px"
                value="ALL"
              >
                All
              </v-btn>
              <CharacterSubClass
                v-for="(subClass, index) in allSubClasses"
                :key="index"
                :subClassId="subClass"
                v-show="subClasses.includes(subClass)"
                :value="subClass"
            /></v-btn-toggle>
            <div class="d-flex justify-center">
              <v-btn variant="outlined" class="rounded-0" @click="selectNone"
                >Select none</v-btn
              >
              <v-btn variant="outlined" class="rounded-0" @click="selectAll"
                >Select all</v-btn
              >
            </div>
          </div>
          <v-card-text>
            <v-item-group
              v-model="selectedOperatorIds"
              multiple
              class="operatorContainer"
            >
              <v-item
                v-for="(operator, index) in operators"
                :key="index"
                v-slot="{ isSelected, toggle }"
                :value="operator.id"
              >
                <OperatorCard
                  :id="operator.id"
                  :name="operator.appellation"
                  :isSelected="isSelected"
                  v-show="filterOperatorIds.includes(operator.id)"
                  @click="toggle"
              /></v-item>
            </v-item-group>
          </v-card-text>
        </v-card> </v-card-text></v-card
  ></v-dialog>
</template>

<script>
import CharacterClass from "./CharacterClass.vue";
import CharacterSubClass from "./CharacterSubClass.vue";
import OperatorCard from "../MaterialPlanner/OperatorCard.vue";
export default {
  name: "CharacterSelectorDialog",
  props: ["selected"],
  inject: ["operators"],
  emits: ["save"],
  data() {
    return {
      selectedOperatorIds: this.selected || [],
      filterClass: "ALL",
      filterSubClass: "ALL",
    };
  },
  methods: {
    save() {
      this.$emit("save", this.selectedOperatorIds);
    },
    selectAll() {
      let selectedOperatorIds = new Set(
        this.selectedOperatorIds.concat(this.filterOperatorIds)
      );
      this.selectedOperatorIds = [...selectedOperatorIds];
    },
    selectNone() {
      this.selectedOperatorIds = this.selectedOperatorIds.filter(
        (operatorId) => !this.filterOperatorIds.includes(operatorId)
      );
    },
  },
  computed: {
    operatorClasses() {
      return Object.values(
        this.$store.state.character.characterClassById
      ).filter((charClass) => !["TOKEN", "TRAP"].includes(charClass.classId));
    },
    allSubClasses() {
      return this.operatorClasses.reduce((combine, charClass) => {
        return combine.concat([...charClass.subClass]);
      }, []);
    },
    subClasses() {
      return (
        this.$store.state.character.characterClassById[this.filterClass]
          ?.subClass || []
      );
    },
    filterOperatorIds() {
      return this.operators
        .filter((operator) => {
          if (this.filterClass !== "ALL") {
            if (this.filterSubClass !== "ALL") {
              return this.filterSubClass === operator.subProfessionId;
            } else {
              return this.filterClass === operator.profession;
            }
          } else {
            return true;
          }
        })
        .map((operator) => operator.id);
    },
  },
  watch: {
    filterClass(newClass, oldClass) {
      if (newClass !== oldClass) {
        this.filterSubClass = "ALL";
      }
    },
  },
  components: { CharacterClass, CharacterSubClass, OperatorCard },
};
</script>

<style scoped>
.character-class-list {
  height: auto !important;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
