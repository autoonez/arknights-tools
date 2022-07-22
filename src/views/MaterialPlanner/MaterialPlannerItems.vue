<template>
  <v-container>
    <v-card>
      <v-card-title>LMD <v-spacer></v-spacer> {{ lmd }}</v-card-title>
      <v-divider></v-divider>
      <v-card-title>Material</v-card-title>
      <v-card-text class="material-container">
        <MaterialItem
          v-for="material in materialList"
          :item-id="material.itemId"
          :require-from-character="itemRequireFromCharacter[material.itemId]"
          :require-from-crafting="itemRequireFromCrafting[material.itemId]"
          :crafting="craftingItem[material.itemId]"
          :key="material.itemId"
          @click="selectItem(material.itemId)"
        />
      </v-card-text>
      <v-divider></v-divider>
      <v-card-title>EXP</v-card-title>
      <v-card-text class="material-container">
        <MaterialExpItem
          v-for="(item, index) in expItemList"
          :key="index"
          :itemId="item.id"
          :number="expItems.items[item.id]"
          :min="expItems.min[item.id]"
          :max="expItems.max[item.id]"
          @update="expItemChange"
        />
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn variant="outlined" @click="showMaterialCurrentDialog = true"
          >Current Items</v-btn
        >
      </v-card-actions>
    </v-card>
    <MaterialDialog
      v-model="showMaterialDialog"
      :item-id="selectedItem"
      @change-formula="craftingFormulaChange"
    />
    <MaterialCurrentDialog
      v-model="showMaterialCurrentDialog"
      @close="showMaterialCurrentDialog = false"
    />
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import MaterialExpItem from "../../components/MaterialPlanner/MaterialExpItem.vue";
import MaterialDialog from "../../components/MaterialPlanner/MaterialDialog.vue";
import MaterialItem from "../../components/MaterialPlanner/MaterialItem.vue";
import { computed } from "vue";
import MaterialCurrentDialog from "../../components/MaterialPlanner/MaterialCurrentDialog.vue";

export default {
  name: "MaterialPlannerItems",
  props: ["panel"],
  data() {
    return {
      showAll: false,
      selectedItem: "",
      showMaterialDialog: false,
      showMaterialCurrentDialog: false,
      expItems: {
        total: 0,
        items: {},
        min: {},
        max: {},
      },
      craftingItem: {},
      craftingFormula: {
        WORKSHOP: {},
        MANUFACTURE: {},
      },
      itemRequireFromCharacter: {},
      itemRequireFromCrafting: {
        4001: 0,
      },
    };
  },
  computed: {
    ...mapGetters(["materials"]),
    itemDataById() {
      return this.$store.state.item.itemDataById;
    },
    expItemById() {
      return this.$store.state.gameData.expItems;
    },
    expItemList() {
      return Object.values(this.expItemById).sort(
        (a, b) => b.gainExp - a.gainExp
      );
    },
    materialList() {
      return this.materials.filter((item) => item.itemType === "MATERIAL");
    },
    currentItem() {
      return this.$store.state.materialPlanner.currentItem;
    },
    lmd() {
      return (
        (this.itemRequireFromCharacter[4001] || 0) +
        (this.itemRequireFromCrafting[4001] || 0)
      );
    },
  },
  methods: {
    getResult() {
      let itemRequireFromCharacter = this.getItemRequireFromCharacter();
      let expItems = {
        total: 0,
        items: {},
        min: {},
        max: {},
      };
      let expItemIds = Object.keys(this.expItemById);
      for (const itemId of expItemIds) {
        let amount =
          (itemRequireFromCharacter[itemId] || 0) -
          (this.currentItem[itemId] || 0);
        expItems.items[itemId] = amount;
        expItems.total += amount * this.expItemById[itemId].gainExp;
      }

      this.itemRequireFromCharacter = itemRequireFromCharacter;
      this.expItems = expItems;
    },
    expItemChange({ itemId, oldValue, newValue }) {
      if (oldValue === newValue) {
        return;
      }

      let items = { ...this.expItems.items };
      let exp =
        this.expItemById[itemId].gainExp * Math.abs(newValue - oldValue);

      if (newValue > oldValue) {
        for (
          let index =
            this.expItemList.findIndex((item) => item.id === itemId) + 1;
          index <= this.expItemList.length - 1;
          index++
        ) {
          if (exp === 0) {
            break;
          }

          let item = this.expItemList[index];
          let itemAmount = this.expItems.items[item.id];
          if (itemAmount === 0) {
            continue;
          }

          let convertAmount = Math.floor(exp / item.gainExp);
          if (itemAmount > convertAmount) {
            items[item.id] -= convertAmount;
            exp -= convertAmount * item.gainExp;
          } else {
            items[item.id] -= itemAmount;
            exp -= itemAmount * item.gainExp;
          }
        }
      } else if (newValue < oldValue) {
        for (
          let index =
            this.expItemList.findIndex((item) => item.id === itemId) + 1;
          index <= this.expItemList.length - 1;
          index++
        ) {
          if (exp === 0) {
            break;
          }

          let item = this.expItemList[index];

          let convertAmount = Math.floor(exp / item.gainExp);
          items[item.id] += convertAmount;
          exp -= convertAmount * item.gainExp;
        }
      }
      if (exp === 0) {
        items[itemId] = newValue;
        this.expItems.items = items;
        this.expItems.min = {};
        this.expItems.max = {};
      } else {
        if (newValue > oldValue) {
          this.expItems.max[itemId] = oldValue;
        } else if (newValue < oldValue) {
          this.expItems.min[itemId] = oldValue;
        }
      }
    },
    selectItem(itemId) {
      this.selectedItem = itemId;
      this.showMaterialDialog = true;
    },
    closeDialog() {
      this.showMaterialCraftingDialog = false;
      this.showMaterialDialog = false;
      this.showMaterialListDialog = false;
      this.getResult();
    },
    getItemRequireFromCharacter() {
      let result = {
        itemRequireById: {
          //itemId 4001 = LMD
          4001: 0,
        },
        addItemSet(itemSet = {}) {
          for (const [itemId, count] of Object.entries(itemSet)) {
            if (!(itemId in this.itemRequireById)) {
              this.itemRequireById[itemId] = 0;
            }
            this.itemRequireById[itemId] += count;
          }
        },
        removeItemSet(itemSet = {}) {
          for (const [itemId, count] of Object.entries(itemSet)) {
            if (itemId in this.itemRequireById) {
              this.itemRequireById[itemId] -= count;
            }
          }
        },
      };

      let gameData = this.$store.state.gameData;
      let getExpItemRequire = (totalExp) => {
        let expItems = Object.values(gameData.expItems).sort(
          (a, b) => b.gainExp - a.gainExp
        );
        let result = expItems.reduce((byId, item) => {
          byId[item.id] = 0;
          return byId;
        }, {});
        for (const [index, item] of expItems.entries()) {
          if (totalExp / item.gainExp > 0) {
            let count = Math.floor(totalExp / item.gainExp);
            result[item.id] += count;
            totalExp -= item.gainExp * count;
          } else if (totalExp > 0 && index === expItems.length - 1) {
            result[item.id] += 1;
          }
        }
        return result;
      };
      for (const operatorId of this.$store.state.materialPlanner
        .selectedOperatorIds) {
        let data = this.$store.state.itemUseByCharacterId[operatorId];
        let operator =
          this.$store.state.character.characterDataById[operatorId];
        let current =
          this.$store.state.materialPlanner.currentOperator[operatorId];
        let target =
          this.$store.state.materialPlanner.targetOperator[operatorId];

        //phase
        if (target.phase > 0) {
          result.addItemSet(data.phases[target.phase]);
        }
        if (current.phase > 0) {
          result.removeItemSet(data.phases[current.phase]);
        }
        let phaseDiff = target.phase - current.parse;
        if (phaseDiff > 0) {
          let evolveGoldCost = gameData.evolveGoldCost[operator.rarity];
          result.addItemSet({
            4001: evolveGoldCost
              .reverse()
              .slice(0, phaseDiff)
              .reduce((sum, cost) => (sum += cost), 0),
          });
        }

        //level
        for (let phase = current.phase; phase <= target.phase; phase++) {
          let maxLevel = gameData.maxLevel[operator.rarity][phase];
          let currentLevel = phase === target.phase ? current.level : 1;
          let targetLevel = phase === target.phase ? target.level : maxLevel;
          if (targetLevel - currentLevel > 0) {
            let characterUpgradeCostMap =
              gameData.characterUpgradeCostMap[phase];
            let characterExpMap = gameData.characterExpMap[phase];
            //lmd
            result.addItemSet({
              4001: characterUpgradeCostMap
                .slice(currentLevel - 1, targetLevel - 1)
                .reduce((sum, cost) => (sum += cost), 0),
            });

            //exp
            let totalExp = characterExpMap
              .slice(currentLevel - 1, targetLevel - 1)
              .reduce((sum, exp) => (sum += exp), 0);
            result.addItemSet(getExpItemRequire(totalExp));
          }
        }

        //skillLevel
        result.addItemSet(data.allSkillLvlup[target.skillLevel]);
        result.removeItemSet(data.allSkillLvlup[current.skillLevel]);

        //skillMastery
        for (const skillId of Object.keys(data.skills)) {
          if (target.skillMastery[skillId] > 0) {
            result.addItemSet(
              data.skills[skillId].levelUpCostCond[target.skillMastery[skillId]]
            );
          }
          if (current.skillMastery[skillId] > 0) {
            result.removeItemSet(
              data.skills[skillId].levelUpCostCond[
                current.skillMastery[skillId]
              ]
            );
          }
        }

        //equipment
        for (const equipmentId of Object.keys(data.modules)) {
          if (target.modules[equipmentId] > 0) {
            result.addItemSet(
              data.modules[equipmentId][target.modules[equipmentId]]
            );
          }
          if (current.modules[equipmentId] > 0) {
            result.removeItemSet(
              data.modules[equipmentId][current.modules[equipmentId]]
            );
          }
        }
      }

      return result.itemRequireById;
    },
    craftingFormulaChange(payload) {
      const { formulaType, formulaId, oldValue, newValue } = payload;
      if (newValue === oldValue) {
        return;
      } else {
        let formula =
          this.$store.state.itemFormulaDataById[formulaType][formulaId];

        let difference = newValue - oldValue;
        let item = this.craftingItem[formula.itemId] || 0;
        item += difference * formula.count;

        this.craftingFormula[formulaType][formulaId] = newValue;
        this.craftingItem[formula.itemId] = item;
        this.itemRequireFromCrafting[4001] += difference * formula.goldCost;
        for (const item of formula.costs) {
          let cost = this.itemRequireFromCrafting[item.id] || 0;
          cost += difference * item.count;
          this.itemRequireFromCrafting[item.id] = cost;
        }
      }
    },
  },
  watch: {
    panel() {
      if (this.panel === "ITEM") {
        this.getResult();
      }
    },
  },
  provide() {
    return {
      craftingItem: computed(() => this.craftingItem),
      craftingFormula: computed(() => this.craftingFormula),
      itemRequireFromCharacter: computed(() => this.itemRequireFromCharacter),
      itemRequireFromCrafting: computed(() => this.itemRequireFromCrafting),
    };
  },
  components: {
    MaterialExpItem,
    MaterialDialog,
    MaterialItem,
    MaterialCurrentDialog,
  },
};
</script>

<style scoped>
.material-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, 48px);
  grid-row-gap: 16px;
  justify-content: center;
}
</style>
