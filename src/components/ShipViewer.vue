<template>
  <div>
    <p><button @click="saveShip">Save Ship</button></p>
    <label for="shipName">Your ship name: </label>
    <input
      @change="addShipName"
      name="shipName"
      v-model="this.loadedShip.name"
    />
    <ShipClassSelector
      :listedShipClasses="this.shipClassList"
      :isLoadedShip="this.getIsLoaded()"
      @validate-ship="validateShip"
    />
    <RadarSelector
      :listedRadars="this.radarList"
      :isLoadedShip="this.getIsLoaded()"
      @validate-ship="validateShip"
    />
    <JumpDriveSelector
      :listedJumpDrives="this.jumpDriveList"
      :isLoadedShip="this.getIsLoaded()"
      @validate-ship="validateShip"
    />
    <ImpulseEngineSelector
      :listedImpulseEngines="this.impulseEngineList"
      :isLoadedShip="this.getIsLoaded()"
      @validate-ship="validateShip"
    />
    <ComputerSelector
      :listedComputers="this.computerList"
      :isLoadedShip="this.getIsLoaded()"
      @validate-ship="validateShip"
    />
    <ArmourSelector
      :listedArmours="this.armourList"
      :isLoadedShip="this.getIsLoaded()"
      @validate-ship="validateShip"
    />
    <WeaponSelector
      :listedWeapons="this.weaponList"
      :isLoadedShip="this.getIsLoaded()"
      @validate-ship="validateShip"
    />
    <AmmunitionSelector
      :listedAmmo="this.ammoList"
      :isLoadedShip="this.getIsLoaded()"
      @validate-ship="validateShip"
    />
    Create or edit program:
    <ProgramCreator />
  </div>
</template>

<script>
import ShipClassSelector from "./Selectors/ShipClassSelector";
import RadarSelector from "./Selectors/RadarSelector";
import JumpDriveSelector from "./Selectors/JumpDriveSelector";
import ImpulseEngineSelector from "./Selectors/ImpulseEngineSelector";
import ComputerSelector from "./Selectors/ComputerSelector";
import ArmourSelector from "./Selectors/ArmourSelector";
import WeaponSelector from "./Selectors/WeaponSelector";
import AmmunitionSelector from "./Selectors/AmmoSelector";
import ProgramCreator from "./ProgramCreator";

export default {
  name: "ShipViewer",
  props: { loadedShip: {} },
  components: {
    ShipClassSelector,
    RadarSelector,
    JumpDriveSelector,
    ImpulseEngineSelector,
    ComputerSelector,
    ArmourSelector,
    WeaponSelector,
    AmmunitionSelector,
    ProgramCreator
  },
  created() {
    // this.$store.dispatch('loadShip', {'id': 1})
    // this.$store.dispatch(
    //   'loadCharacterComponents',
    //   {
    //     componentType: 'radar',
    //     characterId: this.$store.getters.characterId
    //   }
    // )
    this.radarList = this.listById(this.$store.getters.radars);
    this.jumpDriveList = this.listById(this.$store.getters.jumpDrives);
    this.impulseEngineList = this.listById(this.$store.getters.impulseEngines);
    this.computerList = this.listById(this.$store.getters.computers);
    this.armourList = this.listById(this.$store.getters.armours);
    this.shipClassList = this.listById(this.$store.getters.shipClasses);
    this.weaponList = this.listById(this.$store.getters.weapons);
    this.ammoList = this.listById(this.$store.getters.ammunitions);
    this.loadProgram();
  },
  data: function() {
    return {
      radarList: [],
      jumpDriveList: [],
      impulseEngineList: [],
      computerList: [],
      armourList: [],
      shipClassList: [],
      weaponList: [],
      ammoList: []
    };
  },
  computed: {
    programName: function() {
      if (this.getIsLoaded()) {
        return this.$store.getters.program.name;
      } else {
        return "";
      }
    }
  },
  methods: {
    addShipName(event) {
      this.$store.commit("setShipName", event.target.value);
    },
    listById(components) {
      const listedComponents = { 0: {} };
      for (const component of components) {
        listedComponents[component.id] = component;
      }
      return listedComponents;
    },
    getIsLoaded() {
      return this.loadedShip.id !== null;
    },
    loadProgram() {
      if (this.getIsLoaded()) {
        this.$store.commit(
          "setSubroutines",
          this.$store.getters.ship.program.subroutines
        );
      }
    },
    // TODO: Check ship weight whenever a component is added/changed
    validateShip() {
      console.log("validated!");
    },
    saveShip() {
      // Format into expected json
      const payload = { ship: {} };
      this.$store.dispatch("saveShip", payload);
    }
  }
};
</script>
