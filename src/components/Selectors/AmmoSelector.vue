<template>
  <div>
    Current munitions: 
    <p v-for="(ammo, idx) in addedAmmo" :key="idx">
      Name: {{ ammo.name }}
      Mass: {{ ammo.mass }} 
      Ammunition Type: {{ ammo.ammunitionType }}
      Damage Type: {{ ammo.damageType }}
      Ammunition Count: {{ ammo.maxAmmunition }}
      <button @click="removeAmmo(idx, ammo.id)">Remove</button>
    </p>
    <div>
      Add a ammunition to {{ $store.getters.ship.name }}:
      <select v-model="selectedAmmo">
        <option
          v-for="option in ammoOptions"
          v-bind:key="option.key"
          v-bind:value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
      Mass: {{ listedAmmo[selectedAmmo].mass }} Ammunition Type: 
      {{ listedAmmo[selectedAmmo].ammunitionType }} Damage Type: 
      {{ listedAmmo[selectedAmmo].damageType }} Ammunition Count: 
      {{ listedAmmo[selectedAmmo].maxAmmunition }}
      <button v-on:click="addAmmo">Add</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AmmoSelector",
  props: { listedAmmo: {}, isLoadedShip: {} },
  data: function() {
    return {
      selectedAmmo: 0,
      ammoOptions: this.formatAmmo(this.$store.getters.ammunitions),
      addedAmmo: this.getSelectedAmmo(this.isLoadedShip),
      ammoIndex: 0
    };
  },
  methods: {
    formatAmmo(ammunitions) {
      const formattedAmmunitions = {};
      for (const ammunition of ammunitions) {
        formattedAmmunitions[ammunition.id] = {
          text: ammunition.name,
          key: ammunition.name,
          value: ammunition.id
        };
      }
      return formattedAmmunitions;
    },
    getSelectedAmmo(isLoadedShip) {
      if (isLoadedShip) {
        return this.$store.getters.ship.ammunitions;
      } else {
        return {};
      }
    },
    addAmmo() {
      this.$set(this.addedAmmo, this.ammoIndex, this.listedAmmo[this.selectedAmmo])
      this.ammoIndex++;
      this.$store.commit("setShipAmmunition", this.listedAmmo[this.selectedAmmo]);
      this.selectedAmmo=0;
      this.$emit("validate-ship");
    },
    removeAmmo(idx, ammoId) {
      this.$delete(this.addedAmmo, idx);
      this.$store.commit("removeShipAmmunition", ammoId);
      this.$emit("validate-ship");
    }
  }
};
</script>
