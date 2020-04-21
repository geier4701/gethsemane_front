<template>
  <div>
    Select {{ $store.getters.ship.name }}'s armour:
    <select @change="addArmour" v-model="selectedArmour">
      <option
        v-for="option in armourOptions"
        v-bind:key="option.key"
        v-bind:value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
    Mass: {{ listedArmours[selectedArmour].mass }} Repair Cost:
    {{ listedArmours[selectedArmour].repairCost }} Armour Type:
    {{ listedArmours[selectedArmour].armourType }}
  </div>
</template>
<script>
export default {
  name: "ArmourSelector",
  props: { listedArmours: {}, isLoadedShip: {} },
  data: function() {
    return {
      selectedArmour: this.getSelectedArmour(this.isLoadedShip),
      armourOptions: this.formatArmours(this.$store.getters.armours)
    };
  },
  methods: {
    formatArmours(armours) {
      const formattedArmours = {};
      for (const armour of armours) {
        formattedArmours[armour.id] = {
          text: armour.name,
          key: armour.name,
          value: armour.id
        };
      }
      return formattedArmours;
    },
    getSelectedArmour(isLoadedShip) {
      if (isLoadedShip) {
        return this.$store.getters.ship.armour.id;
      } else {
        return 0;
      }
    },
    addArmour() {
      this.$store.commit(
        "setShipArmour",
        this.listedArmours[this.selectedArmour]
      );
      this.$emit("validate-ship");
    }
  }
};
</script>
