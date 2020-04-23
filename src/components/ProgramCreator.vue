<template>
  <div>
    <div>
      <p>
        <label for="programName">Program Name: </label>
        <input name="programName" v-model="programName" />
        <button @click="saveProgram">Save Program</button>
      </p>
      <p v-for="(subroutine, idx) in addedSubroutines" :key="idx">
        Priority: {{ subroutine.priority }}
        <Conditions :conditions="subroutine.conditions" />
        <Actions :actions="subroutine.actions" />
        <button @click="editSubroutine(idx)">Edit</button>
        <button @click="removeSubroutine(idx)">Delete</button>
      </p>
    </div>
    <div>
      <p>
        <label for="priority">Subroutine Priority: </label>
        <input name="priority" v-model="priority" />
      </p>
      <ConditionSelector
        @validate-program="validateProgram"
        :componentOptions="this.componentOptions"
      />
      <ActionSelector
        @validate-program="validateProgram"
        :componentOptions="this.componentOptions"
        :weaponOptions="this.weaponOptions"
      />
    </div>
    <button v-on:click="addSubroutine">Add Subroutine</button>
  </div>
</template>

<script>
import ConditionSelector from "./Selectors/ConditionSelector";
import ActionSelector from "./Selectors/ActionSelector";
import Subroutine from "../types/Subroutine";
import Conditions from "./Conditions";
import Actions from "./Actions";

export default {
  name: "SubroutineCreator",
  components: { ConditionSelector, ActionSelector, Conditions, Actions },
  created() {
    this.componentOptions = this.formatComponents(
      this.getRepairableComponents()
    );
    this.weaponOptions = this.formatComponents(this.getWeapons());
  },
  data: function() {
    return {
      priority: "",
      componentOptions: {},
      weaponOptions: {},
      programName: ""
    };
  },
  computed: {
    addedSubroutines: function() {
      return this.$store.getters.subroutines;
    }
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
    },
    addSubroutine() {
      const builtSubroutine = new Subroutine(
        null,
        this.priority,
        this.$store.getters.conditions,
        this.$store.getters.actions
      );
      this.$store.commit("setSubroutine", builtSubroutine);
      this.priority = "";
      this.$store.commit("clearActionsConditions");
    },
    editSubroutine(idx) {
      this.priority = this.$store.getters.subroutines[idx].priority;
      this.$store.commit(
        "setConditions",
        this.$store.getters.subroutines[idx].conditions
      );
      this.$store.commit(
        "setActions",
        this.$store.getters.subroutines[idx].actions
      );
      this.$store.commit("removeSubroutine", idx);
    },
    removeSubroutine(idx) {
      this.$store.commit("removeSubroutine", idx);
      this.validateProgram();
    },
    saveProgram() {
      const builtProgram = {
        id: null,
        name: this.programName,
        subroutines: this.addedSubroutines
      };
      this.$store.commit("setProgram", builtProgram);
      this.$store.commit("setShipProgram", builtProgram);
      this.programName = "";
      this.$store.commit("clearSubroutines");
    }
  }
};
</script>
