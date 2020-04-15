<template>
  <div>
    <p>
      <label for="shipName">Your ship name: </label
      >{{ $store.getters.ship.name }}
    </p>
    <input @change="addShipName" name="shipName" />
    <RadarSelector
      :listedRadars="this.radarList"
      :isLoadedShip="this.getIsLoaded()"
    />
    <JumpDriveSelector
      :listedJumpDrives="this.jumpDriveList"
      :isLoadedShip="this.getIsLoaded()"
    />
  </div>
</template>

<script>
import RadarSelector from "./RadarSelector";
import JumpDriveSelector from "./JumpDriveSelector";

export default {
  name: "ShipViewer",
  props: { loadedShip: {} },
  components: {
    RadarSelector,
    JumpDriveSelector
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
  },
  data: function() {
    return {
      radarList: this.listById(this.$store.getters.radars),
      jumpDriveList: this.listById(this.$store.getters.jumpDrives)
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
    }
  }
};
</script>
