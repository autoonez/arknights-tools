<template>
  <v-card variant="outlined">
    <v-card-actions class="flex-wrap">
      <v-btn variant="outlined" @click="getResult" color="info"
        >Get result</v-btn
      >
      <v-btn variant="outlined" @click="showMaterialListDialog = true"
        >Current Item</v-btn
      >
      <v-btn variant="outlined" @click="showMaterialCraftingDialog = true"
        >Crafting</v-btn
      >
    </v-card-actions>
  </v-card>
  <v-card variant="outlined" class="mt-4">
    <v-toolbar>
      <v-toolbar-title>LMD</v-toolbar-title>
      <v-spacer></v-spacer>
      {{ lmd }}
    </v-toolbar>
  </v-card>
  <v-card variant="outlined" class="mt-4">
    <v-toolbar title="Material"></v-toolbar>
    <v-card-text class="material-container">
      <ItemWithNumber
        v-for="(item, index) in materials"
        :itemId="item.itemId"
        :number="item.number"
        :key="index"
        @click="selectItem(item.itemId)"
      />
    </v-card-text>
  </v-card>
  <v-card variant="outlined" class="mt-4">
    <v-toolbar>
      <v-toolbar-title>EXP</v-toolbar-title>
    </v-toolbar>
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
  </v-card>
  <MaterialDialog
    v-model="showMaterialDialog"
    :itemId="selectedItem"
    @set="closeDialog"
  />
  <MaterialListDialog v-model="showMaterialListDialog" @set="closeDialog" />
  <MaterialCraftingDialog
    v-model="showMaterialCraftingDialog"
    @set="closeDialog"
  />
</template>

<script>
import { mapGetters } from "vuex";
import ItemWithNumber from "./ItemWithNumber.vue";
import MaterialExpItem from "./MaterialExpItem.vue";
import MaterialDialog from "./MaterialDialog.vue";
import MaterialListDialog from "./MaterialListDialog.vue";
import MaterialCraftingDialog from "./MaterialCraftingDialog.vue";

export default {
  data() {
    return {
      showAll: false,
      selectedItem: "",
      showMaterialDialog: false,
      showMaterialListDialog: false,
      showMaterialCraftingDialog: false,
      materials: [],
      lmd: 0,
      expItems: {
        total: 0,
        items: {},
        min: {},
        max: {},
      },
    };
  },
  computed: {
    ...mapGetters(["materialIds", "itemRequireById", "activeFormula"]),
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
    currentItem() {
      return this.$store.state.materialPlanner.currentItem;
    },
  },
  methods: {
    getResult() {
      let materials = [];
      let expItems = {
        total: 0,
        items: {},
        min: {},
        max: {},
      };
      let expItemIds = Object.keys(this.expItemById);
      for (const itemId of this.materialIds) {
        if (expItemIds.includes(itemId)) {
          let amount =
            (this.itemRequireById[itemId] || 0) -
            (this.currentItem[itemId] || 0);
          expItems.items[itemId] = amount;
          expItems.total += amount * this.expItemById[itemId].gainExp;
        } else if (itemId.toString() !== "4001") {
          let itemRequire = this.itemRequireById[itemId] || 0;
          let formulaRequire = this.activeFormula.costs[itemId] || 0;
          let currentItem = this.currentItem[itemId] || 0;
          let formulaCraft = this.activeFormula.item[itemId] || 0;
          let number =
            itemRequire + formulaRequire - currentItem - formulaCraft;
          if (number > 0) {
            materials.push({
              itemId,
              number,
              sort: this.itemDataById[itemId].sortId,
            });
          }
        }
      }
      this.materials = materials.sort((a, b) => a.sort - b.sort);
      this.lmd = this.itemRequireById[4001];
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
  },

  components: {
    ItemWithNumber,
    MaterialExpItem,
    MaterialDialog,
    MaterialListDialog,
    MaterialCraftingDialog,
  },
};
</script>

<style scoped>
.material-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, 64px);
  grid-row-gap: 16px;
  justify-content: center;
}
</style>
