<template>
  <div>
    Select {{ $store.getters.ship.name }}'s jump drive:
    <select @change="addJumpDrive" v-model="selectedJumpDrive">
      <option
        v-for="option in jumpDriveOptions"
        v-bind:key="option.key"
        v-bind:value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
    Mass: {{ listedJumpDrives[selectedJumpDrive].mass }} Repair Cost:
    {{ listedJumpDrives[selectedJumpDrive].repairCost }} Energy Cost:
    {{ listedJumpDrives[selectedJumpDrive].energyCost }}
  </div>
</template>
<script>
export default {
  name: "JumpDriveSelector",
  props: { listedJumpDrives: {}, isLoadedShip: {} },
  data: function() {
    return {
      selectedJumpDrive: this.getSelectedJumpDrive(this.isLoadedShip),
      jumpDriveOptions: this.formatJumpDrives(this.$store.getters.jumpDrives)
    };
  },
  methods: {
    formatJumpDrives(jumpDrives) {
      const formattedJumpDrives = {};
      for (const jumpDrive of jumpDrives) {
        formattedJumpDrives[jumpDrive.id] = {
          text: jumpDrive.name,
          key: jumpDrive.name,
          value: jumpDrive.id
        };
      }
      return formattedJumpDrives;
    },
    getSelectedJumpDrive(isLoadedShip) {
      if (isLoadedShip) {
        return this.$store.getters.ship.jumpDrive.id;
      } else {
        return 0;
      }
    },
    addJumpDrive() {
      this.$store.commit("setShipJumpDrive", this.listedJumpDrives[this.selectedJumpDrive]);
      this.$emit("validate-ship");
    }
  }
};
</script>
