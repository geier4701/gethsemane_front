<template>
  <div>
    Select {{ $store.getters.ship.name }}'s computer:
    <select @change="addComputer" v-model="selectedComputer">
      <option
        v-for="option in computerOptions"
        v-bind:key="option.key"
        v-bind:value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
    Mass: {{ listedComputers[selectedComputer].mass }} Speed:
    {{ listedComputers[selectedComputer].speed }} Capacity:
    {{ listedComputers[selectedComputer].capacity }}
  </div>
</template>
<script>
export default {
  name: "ComputerSelector",
  props: { listedComputers: {}, isLoadedShip: {} },
  data: function() {
    return {
      selectedComputer: this.getSelectedComputer(this.isLoadedShip),
      computerOptions: this.formatComputers(this.$store.getters.computers)
    };
  },
  methods: {
    formatComputers(computers) {
      const formattedComputers = {};
      for (const computer of computers) {
        formattedComputers[computer.id] = {
          text: computer.name,
          key: computer.name,
          value: computer.id
        };
      }
      return formattedComputers;
    },
    getSelectedComputer(isLoadedShip) {
      if (isLoadedShip) {
        return this.$store.getters.ship.radar.id;
      } else {
        return 0;
      }
    },
    addComputer() {
      this.$store.commit(
        "setShipComputer",
        this.listedComputers[this.selectedComputer]
      );
      this.$emit("validate-ship");
    }
  }
};
</script>
