<template>
  <div>
    <p>Check out your ship bro</p>
    <ShipViewer :loadedShip="loadedShip" />
  </div>
</template>

<script>
import ShipViewer from "../components/ShipViewer";

export default {
  components: {
    ShipViewer
  },
  mounted() {
    // this.$store.dispatch('loadShip', {'id': 1})
  },
  data: function() {
    return {
      loadedShip: this.$store.getters.ship
    };
  }
};
</script>
