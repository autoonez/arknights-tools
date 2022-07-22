<template>
  <v-container>
    <v-btn-toggle
      v-model="type"
      color="info"
      density="compact"
      class="w-100 rounded-0"
    >
      <v-btn value="CURRENT" class="w-50 rounded-0">CURRENT</v-btn>
      <v-btn value="TARGET" class="w-50 rounded-0">TARGET</v-btn>
    </v-btn-toggle>
    <v-table height="calc(100vh - 48px - 32px - 36px - 40px)">
      <thead>
        <tr>
          <th></th>
          <th>
            <v-btn
              density="compact"
              variant="outlined"
              @click="showFilterDialog = true"
              >filter</v-btn
            >
          </th>
          <th class="text-center">Promotion</th>
          <th class="text-center">Level</th>
          <th class="text-center">Skill level</th>
          <th colspan="3" class="text-center">Skill Mastery</th>
          <th colspan="2" class="text-center">Modules</th>
          <th>
            <MaxMinButton @set="setAllFiltered" />
          </th>
        </tr>
      </thead>
      <tbody>
        <OperatorTableRow
          v-for="(operator, index) in filteredOperators"
          :key="index"
          :operator="operator"
          :selected="selectedOperatorIds.includes(operator.id)"
          @select-operator="selectOperator"
        />
      </tbody>
    </v-table>
    <OperatorFilterDialog
      v-model="showFilterDialog"
      :filter="filter"
      @close="closeFilterDialog"
    />
    <OperatorDialog
      v-model="showOperatorDialog"
      :id="selectedOperatorId"
      @close="showOperatorDialog = false"
    />
  </v-container>
</template>

<script>
import OperatorFilterDialog from "../OperatorFilterDialog/OperatorFilterDialog.vue";

import { computed } from "vue";
import OperatorTableRow from "./OperatorTableRow.vue";
import OperatorDialog from "./OperatorDialog.vue";
import MaxMinButton from "../MaxMinButton.vue";
import { OPERATOR_PLANS_SET } from "../../store/actions";
export default {
  name: "OperatorTable",
  inject: ["operators"],
  data() {
    return {
      type: "CURRENT",
      showFilterDialog: false,
      showOperatorDialog: false,
      selectedOperatorId: null,
      filter: {
        filterClass: "ALL",
        filterSubClass: "ALL",
        filterRarity: "ALL",
        filterSelection: "ALL",
      },
    };
  },
  computed: {
    filteredOperators() {
      return this.operators.filter((operator) => {
        const filterClass =
          this.filter.filterClass === "ALL"
            ? true
            : operator.profession === this.filter.filterClass;
        const filterSubClass =
          this.filter.filterSubClass === "ALL"
            ? true
            : operator.subProfessionId === this.filter.filterSubClass;
        const filterRarity =
          this.filter.filterRarity === "ALL"
            ? true
            : operator.rarity === this.filter.filterRarity;
        const filterSelection =
          this.filter.filterSelection === "ALL"
            ? true
            : this.selectedOperatorIds.includes(operator.id);
        return filterClass && filterSubClass && filterRarity && filterSelection;
      });
    },
    selectedOperatorIds() {
      return this.$store.state.materialPlanner.selectedOperatorIds;
    },
  },
  methods: {
    selectOperator(operatorId) {
      this.selectedOperatorId = operatorId;
      this.showOperatorDialog = true;
    },
    closeFilterDialog(filter) {
      this.filter = filter;
    },
    setAllFiltered(value) {
      this.$store.dispatch(OPERATOR_PLANS_SET, {
        operatorIds: this.selectedOperatorIds,
        type: this.type,
        value,
      });
    },
  },
  provide() {
    return {
      type: computed(() => this.type),
    };
  },
  components: {
    OperatorTableRow,
    OperatorFilterDialog,
    OperatorDialog,
    MaxMinButton,
  },
};
</script>
