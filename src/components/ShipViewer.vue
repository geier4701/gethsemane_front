<template>
  <div>
    <label for="shipName">Your ship name: </label >
    <input @change="addShipName" name="shipName" v-model="this.loadedShip.name" />
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
  </div>
</template>

<script>
import ShipClassSelector from "./Selectors/ShipClassSelector";
import RadarSelector from "./Selectors/RadarSelector";
import JumpDriveSelector from "./Selectors/JumpDriveSelector";
import ImpulseEngineSelector from "./Selectors/ImpulseEngineSelector";
import ComputerSelector from "./Selectors/ComputerSelector";
import ArmourSelector from "./Selectors/ArmourSelector";

export default {
  name: "ShipViewer",
  props: { loadedShip: {} },
  components: {
    ShipClassSelector,
    RadarSelector,
    JumpDriveSelector,
    ImpulseEngineSelector,
    ComputerSelector,
    ArmourSelector
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
  },
  data: function() {
    return {
      radarList: [],
      jumpDriveList: [],
      impulseEngineList: [],
      computerList: [],
      armourList: [],
      shipClassList: []
    };
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
    // TODO: Check ship weight whenever a component is added/changed
    validateShip(component) {
      console.log("validated!");
    }
  }
};
</script>
