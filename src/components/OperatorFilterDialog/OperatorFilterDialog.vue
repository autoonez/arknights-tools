<template>
  <v-dialog @click:outside="close">
    <v-table :style="{ 'max-width': '100vw' }">
      <tbody>
        <tr>
          <td class="text-right">Class</td>
          <v-btn-toggle
            v-model="filterClass"
            color="info"
            mandatory
            divided
            class="rounded-0"
          >
            <td>
              <v-btn height="48px" width="48px" value="ALL"> All </v-btn>
            </td>
            <td v-for="(charClass, index) in operatorClasses" :key="index">
              <OperatorClassIcon
                :classId="charClass.classId"
                :value="charClass.classId"
              />
            </td>
          </v-btn-toggle>
        </tr>
        <tr>
          <td class="text-right">Sub-Class</td>
          <v-btn-toggle
            v-model="filterSubClass"
            color="info"
            mandatory
            divided
            class="rounded-0"
          >
            <td>
              <v-btn height="48px" width="48px" value="ALL"> All </v-btn>
            </td>
            <td v-for="(subClass, index) in allSubClasses" :key="index">
              <OperatorSubClassIcon
                :subClassId="subClass"
                v-show="subClasses.includes(subClass)"
                :value="subClass"
              />
            </td>
          </v-btn-toggle>
        </tr>
        <tr>
          <td class="text-right">Rarity</td>
          <v-btn-toggle
            v-model="filterRarity"
            color="info"
            mandatory
            divided
            class="rounded-0"
          >
            <td>
              <v-btn height="48px" width="48px" value="ALL"> All </v-btn>
            </td>
            <td v-for="value in rarity" :key="value">
              <v-btn height="48px" width="48px" :value="value">{{
                value + 1
              }}</v-btn>
            </td>
          </v-btn-toggle>
        </tr>
        <tr>
          <td class="text-right">Selection</td>
          <v-btn-toggle
            v-model="filterSelection"
            color="info"
            mandatory
            divided
            class="rounded-0"
          >
            <td>
              <v-btn height="48px" width="48px" value="ALL"> All </v-btn>
            </td>
            <td>
              <v-btn height="48px" width="48px" value="SELECTED">
                Selected
              </v-btn>
            </td>
          </v-btn-toggle>
        </tr>
      </tbody>
    </v-table>
  </v-dialog>
</template>

<script>
import OperatorClassIcon from "../OperatorClassIcon.vue";
import OperatorSubClassIcon from "../OperatorSubClassIcon.vue";

export default {
  name: "OperatorFilterDialog",
  props: ["filter"],
  emits: ["close"],
  data() {
    return {
      filterClass: this.filter.filterClass,
      filterSubClass: this.filter.filterSubClass,
      filterRarity: this.filter.filterRarity,
      filterSelection: this.filter.filterSelection,
    };
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
    rarity() {
      return [...Array(6).keys()].reverse();
    },
  },
  methods: {
    close() {
      this.$emit("close", {
        filterClass: this.filterClass,
        filterSubClass: this.filterSubClass,
        filterRarity: this.filterRarity,
        filterSelection: this.filterSelection,
      });
    },
  },
  watch: {
    filterClass(newClass, oldClass) {
      if (newClass !== oldClass) {
        this.filterSubClass = "ALL";
      }
    },
  },
  components: { OperatorClassIcon, OperatorSubClassIcon },
};
</script>
