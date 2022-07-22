<template>
  <v-dialog class="dialog">
    <v-card>
      <v-img :src="imgSrc" width="86px" class="ma-auto py-4"></v-img>

      <v-divider></v-divider>

      <v-list-item lines="two">
        <v-list-item-header>
          <v-list-item-title>Character require</v-list-item-title>
          <v-list-item-subtitle>{{
            requireFromCharacter
          }}</v-list-item-subtitle>
        </v-list-item-header>
      </v-list-item>
      <v-list-item lines="two">
        <v-list-item-header>
          <v-list-item-title>Crafting require</v-list-item-title>
          <v-list-item-subtitle>{{ requireFromCrafting }}</v-list-item-subtitle>
        </v-list-item-header>
      </v-list-item>
      <div
        :style="{
          maxWidth: '80vw',
          'overflow-x': 'auto',
          'overflow-y': 'hidden',
          display: 'flex',
        }"
      >
        <template
          v-for="(formulaList, formulaType) in craftingFormulas"
          :key="formulaType"
        >
          <MaterialFormula
            v-for="formulaId in formulaList"
            :key="formulaId"
            :formula-type="formulaType"
            :formula-id="formulaId"
            @change-formula="changeFormula"
          />
        </template>
      </div>

      <v-divider></v-divider>

      <v-list-item lines="two">
        <v-list-item-header>
          <v-list-item-title>Total require</v-list-item-title>
          <v-list-item-subtitle>{{ totalRequire }}</v-list-item-subtitle>
        </v-list-item-header>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item lines="two">
        <v-list-item-header>
          <v-list-item-title>Current</v-list-item-title>
          <v-list-item-subtitle>
            <v-text-field
              label="Current"
              variant="outlined"
              type="number"
              v-model="currentItem"
              hide-details
              single-line
            ></v-text-field>
          </v-list-item-subtitle>
        </v-list-item-header>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item lines="two">
        <v-list-item-header>
          <v-list-item-title>Still require</v-list-item-title>
          <v-list-item-subtitle>{{ netRequire }}</v-list-item-subtitle>
        </v-list-item-header>
      </v-list-item>
      <template
        v-for="(formula, index) in material.buildingProductList"
        :key="index"
      >
        <v-divider></v-divider>
        <MaterialFormula
          :formula-type="formula.roomType"
          :formula-id="formula.formulaId"
          @change-formula="changeFormula"
        />
      </template> </v-card
  ></v-dialog>
</template>

<script>
import { assetUrl } from "../../constants/url";
import { CURRENT_ITEM_CHANGE } from "../../store/actions";
import MaterialFormula from "./MaterialFormula.vue";

export default {
  name: "MaterialDialog",
  props: ["itemId"],
  inject: [
    "craftingItem",
    "itemRequireFromCharacter",
    "itemRequireFromCrafting",
  ],
  emits: ["changeFormula"],
  computed: {
    material() {
      return this.$store.state.item.itemDataById[this.itemId];
    },
    imgSrc() {
      return `${assetUrl}/images/items/${this.material.iconId}.png`;
    },
    requireFromCharacter() {
      return this.itemRequireFromCharacter[this.itemId] || 0;
    },
    requireFromCrafting() {
      return this.itemRequireFromCrafting[this.itemId] || 0;
    },
    crafting() {
      return this.craftingItem[this.itemId] || 0;
    },
    totalRequire() {
      return this.requireFromCharacter + this.requireFromCrafting;
    },
    netRequire() {
      return this.totalRequire - this.currentItem - this.crafting;
    },
    currentItem: {
      get() {
        return this.$store.state.materialPlanner.currentItem[this.itemId] || 0;
      },
      set(value) {
        this.$store.dispatch(CURRENT_ITEM_CHANGE, {
          itemId: this.itemId,
          value,
        });
      },
    },
    craftingFormulas() {
      return Object.entries(this.$store.state.itemFormulaDataById).reduce(
        (formulas, [formulaTypeId, formulaById]) => {
          for (const formula of Object.values(formulaById)) {
            for (const cost of formula.costs) {
              if (cost.id === this.itemId) {
                formulas[formulaTypeId].push(formula.formulaId);
              }
            }
          }
          return formulas;
        },
        {
          MANUFACTURE: [],
          WORKSHOP: [],
        }
      );
    },
  },
  methods: {
    changeFormula(payload) {
      this.$emit("changeFormula", payload);
    },
  },
  components: { MaterialFormula },
};
</script>
