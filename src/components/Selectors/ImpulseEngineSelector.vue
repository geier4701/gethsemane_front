<template>
  <div>
    Select {{ $store.getters.ship.name }}'s impulse engine:
    <select @change="addImpulseEngine" v-model="selectedImpulseEngine">
      <option
        v-for="option in impulseEngineOptions"
        v-bind:key="option.key"
        v-bind:value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
    Mass: {{ listedImpulseEngines[selectedImpulseEngine].mass }} Repair Cost:
    {{ listedImpulseEngines[selectedImpulseEngine].repairCost }} Max
    Acceleration:
    {{ listedImpulseEngines[selectedImpulseEngine].maxAccel }} Energy Cost:
    {{ listedImpulseEngines[selectedImpulseEngine].energyCost }}
  </div>
</template>
<script>
export default {
  name: "ImpulseEngineSelector",
  props: { listedImpulseEngines: {}, isLoadedShip: {} },
  data: function() {
    return {
      selectedImpulseEngine: this.getSelectedImpulseEngine(this.isLoadedShip),
      impulseEngineOptions: this.formatImpulseEngines(
        this.$store.getters.impulseEngines
      )
    };
  },
  methods: {
    formatImpulseEngines(impulseEngines) {
      const formattedImpulseEngines = {};
      for (const impulseEngine of impulseEngines) {
        formattedImpulseEngines[impulseEngine.id] = {
          text: impulseEngine.name,
          key: impulseEngine.name,
          value: impulseEngine.id
        };
      }
      return formattedImpulseEngines;
    },
    getSelectedImpulseEngine(isLoadedShip) {
      if (isLoadedShip) {
        return this.$store.getters.ship.impulseEngine.id;
      } else {
        return 0;
      }
    },
    addImpulseEngine() {
      this.$store.commit(
        "setShipImpulseEngine",
        this.listedImpulseEngines[this.selectedImpulseEngine]
      );
      this.$emit("validate-ship");
    }
  }
};
</script>
