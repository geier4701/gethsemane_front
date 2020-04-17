<template>
  <div>
    Current weapons: 
    <p v-for="(weapon, idx) in addedWeapons" :key="idx">
      Name: {{ weapon.name }}
      Mass: {{ weapon.mass }} 
      Repair Cost: {{ weapon.repairCost }}
      Energy Cost: {{ weapon.energyCost }}
      Range: {{ weapon.range }}
      Damage: {{ weapon.damage }}
      Ammunition Type: {{ weapon.ammunitionType }}
      Munition Velocity: {{ weapon.munitionVelocity }}
      <button @click="removeWeapon(idx, weapon.id)">Remove</button>
    </p>
    <div>
      Add a weapon to {{ $store.getters.ship.name }}:
      <select v-model="selectedWeapon">
        <option
          v-for="option in weaponOptions"
          v-bind:key="option.key"
          v-bind:value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
      Mass: {{ listedWeapons[selectedWeapon].mass }} Repair Cost: 
      {{ listedWeapons[selectedWeapon].repairCost }} Energy Cost: 
      {{ listedWeapons[selectedWeapon].energyCost }} Range: 
      {{ listedWeapons[selectedWeapon].range }} Damage: 
      {{ listedWeapons[selectedWeapon].damage }} Ammunition Type: 
      {{ listedWeapons[selectedWeapon].ammunitionType }} Munition Velocity: 
      {{ listedWeapons[selectedWeapon].munitionVelocity }}
      <button v-on:click="addWeapon">Add</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeaponSelector",
  props: { listedWeapons: {}, isLoadedShip: {} },
  data: function() {
    return {
      selectedWeapon: 0,
      weaponOptions: this.formatWeapons(this.$store.getters.weapons),
      addedWeapons: this.getSelectedWeapons(this.isLoadedShip),
      weaponIndex: 0
    };
  },
  methods: {
    formatWeapons(weapons) {
      const formattedWeapons = {};
      for (const weapon of weapons) {
        formattedWeapons[weapon.id] = {
          text: weapon.name,
          key: weapon.name,
          value: weapon.id
        };
      }
      return formattedWeapons;
    },
    getSelectedWeapons(isLoadedShip) {
      if (isLoadedShip) {
        return this.$store.getters.ship.weapons;
      } else {
        return {};
      }
    },
    addWeapon() {
      this.$set(this.addedWeapons, this.weaponIndex, this.listedWeapons[this.selectedWeapon])
      this.weaponIndex++;
      this.$store.commit("setShipWeapon", this.listedWeapons[this.selectedWeapon]);
      this.selectedWeapon=0;
      this.$emit("validate-ship");
    },
    removeWeapon(idx, weaponId) {
      this.$delete(this.addedWeapons, idx);
      this.$store.commit("removeShipWeapon", weaponId);
      this.$emit("validate-ship");
    }
  }
};
</script>
