<template>
  <div>
    Select {{ $store.getters.ship.name }}'s class:
    <select @change="addShipClass" v-model="selectedShipClass">
      <option
        v-for="option in shipClassOptions"
        v-bind:key="option.key"
        v-bind:value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
    Maximum Weight: {{ listedShipClasses[selectedShipClass].weight }} Power Generation: 
    {{ listedShipClasses[selectedShipClass].powerGen }} Battery Maximum: 
    {{ listedShipClasses[selectedShipClass].batteryMax }} Health: 
    {{ listedShipClasses[selectedShipClass].health }}
  </div>
</template>
<script>
export default {
  name: "ShipClassSelector",
  props: { listedShipClasses: {}, isLoadedShip: {} },
  data: function() {
    return {
      selectedShipClass: this.getSelectedShipClass(this.isLoadedShip),
      shipClassOptions: this.formatShipClasses(this.$store.getters.shipClasses)
    };
  },
  methods: {
    formatShipClasses(shipClasses) {
      const formattedShipClasses = {};
      for (const shipClass of shipClasses) {
        formattedShipClasses[shipClass.id] = {
          text: shipClass.name,
          key: shipClass.name,
          value: shipClass.id
        };
      }
      return formattedShipClasses;
    },
    getSelectedShipClass(isLoadedShip) {
      if (isLoadedShip) {
        return this.$store.getters.ship.shipClass.id;
      } else {
        return 0;
      }
    },
    addShipClass() {
      this.$store.commit("setShipClass", this.listedShipClasses[this.selectedShipClass]);
      this.$emit("validate-ship");
    }
  }
};
</script>
