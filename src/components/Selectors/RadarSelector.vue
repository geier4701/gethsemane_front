<template>
  <div>
    Select {{ $store.getters.ship.name }}'s radar:
    <select @change="addRadar" v-model="selectedRadar">
      <option
        v-for="option in radarOptions"
        v-bind:key="option.key"
        v-bind:value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
    Mass: {{ listedRadars[selectedRadar].mass }} Repair Cost:
    {{ listedRadars[selectedRadar].repairCost }} Tracking Style:
    {{ listedRadars[selectedRadar].trackingStyle }} Energy Cost:
    {{ listedRadars[selectedRadar].energyCost }}
  </div>
</template>
<script>
export default {
  name: "RadarSelector",
  props: { listedRadars: {}, isLoadedShip: {} },
  data: function() {
    return {
      selectedRadar: this.getSelectedRadar(this.isLoadedShip),
      radarOptions: this.formatRadars(this.$store.getters.radars)
    };
  },
  methods: {
    formatRadars(radars) {
      const formattedRadars = {};
      for (const radar of radars) {
        formattedRadars[radar.id] = {
          text: radar.name,
          key: radar.name,
          value: radar.id
        };
      }
      return formattedRadars;
    },
    getSelectedRadar(isLoadedShip) {
      if (isLoadedShip) {
        return this.$store.getters.ship.radar.id;
      } else {
        return 0;
      }
    },
    addRadar() {
      this.$store.commit("setShipRadar", this.listedRadars[this.selectedRadar]);
      this.$emit("validate-ship");
    }
  }
};
</script>
