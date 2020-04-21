<template>
  <div>
    <div>
      <!-- <p v-for="(subroutine, idx) in addedSubroutines" :key="idx">
                <Conditions :conditions="subroutine.conditions" />
                <Actions :actions="subroutine.actions" />
            </p> -->
    </div>
    <div>
      <label for="priority">Priority: </label>
      <input name="priority" v-model="priority" />
      <ConditionSelector
        @validate-program="validateProgram"
        :componentOptions="this.componentOptions"
      />
      <ActionSelector
        @validate-program="validateProgram"
        :componentOptions="this.componentOptions"
        :weaponOptions="this.weaponOptions"
      />
      <!-- <button v-on:click="addSubroutine">Add</button> -->
    </div>
  </div>
</template>

<script>
import ConditionSelector from "./Selectors/ConditionSelector";
import ActionSelector from "./Selectors/ActionSelector";

export default {
  name: "SubroutineCreator",
  components: { ConditionSelector, ActionSelector },
  props: {
    subroutineList: {}
  },
  created() {
    (this.componentOptions = this.formatComponents(
      this.getRepairableComponents()
    )),
      (this.weaponOptions = this.formatComponents(this.getWeapons()));
  },
  data: function() {
    return {
      addedSubroutines: {},
      priority: "",
      componentOptions: {},
      weaponOptions: {}
    };
  },
  methods: {
    getRepairableComponents() {
      const ship = this.$store.getters.ship;
      const listedRepairableComponents = {};
      listedRepairableComponents[ship.radar.name] = ship.radar;
      listedRepairableComponents[ship.impulseEngine.name] = ship.impulseEngine;
      listedRepairableComponents[ship.jumpDrive.name] = ship.jumpDrive;
      listedRepairableComponents[ship.armour.name] = ship.armour;
      for (const weapon of ship.weapons) {
        listedRepairableComponents[weapon.name] = weapon;
      }
      return listedRepairableComponents;
    },
    getWeapons() {
      const listedWeapons = {};
      for (const weapon of this.$store.getters.ship.weapons) {
        listedWeapons[weapon.name] = weapon;
      }
      return listedWeapons;
    },
    formatComponents(components) {
      const formattedComponents = {};
      for (const componentName in components) {
        const component = components[componentName];
        formattedComponents[component.name] = {
          text: component.name,
          key: component.name,
          value: component
        };
      }
      return formattedComponents;
    },
    // TODO: Validate program isn't too large for chosen cpu
    validateProgram() {
      console.log("validated!");
    }
  }
};
</script>
