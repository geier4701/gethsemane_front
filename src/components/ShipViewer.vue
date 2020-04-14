<template>
  <div>
    <p>
      <label for="shipName">Your ship name: </label
      >{{ $store.getters.ship.name }}
    </p>
    <input @change="addShipName" name="shipName" />
    <p>
      Select {{ $store.getters.ship.name }}'s radar:
      <select v-model="selectedRadar">
        <option
          v-for="option in radarOptions"
          v-bind:key="option.key"
          v-bind:value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
      Mass: {{ availableRadars[selectedRadar].mass }}
    </p>
  </div>
</template>

<script>
export default {
  created() {
    // this.$store.dispatch('loadShip', {'id': 1})
    this.availableRadars = this.loadComponents("radar");
    this.radarOptions = this.formatComponents("radar", this.availableRadars);
  },
  data: function() {
    return {
      selectedRadar: 1,
      radarOptions: [],
      availableRadars: []
    };
  },
  methods: {
    addShipName(event) {
      this.$store.commit("setShipName", event.target.value);
    },
    loadComponents(componentType) {
      if (componentType === "radar") {
        const formattedRadars = {};
        for (const radar of this.$store.getters.radars) {
          const radarId = radar.id;
          formattedRadars[radarId] = radar;
        }
        return formattedRadars;
      }
    },
    formatComponents(componentType, components) {
      if (componentType === "radar") {
        const formattedRadars = [];
        for (const radar of components) {
          formattedRadars.push({
            text: radar.name,
            key: radar.name,
            value: radar.id
          });
        }
        return formattedRadars;
      }
    }
  }
};

// @Component({
//   components: {}
// })
// export default class ShipCreation extends Vue {
//   ship: Ship;

//   constructor() {
//     super();
//     this.ship = this.$store.getters.ship;
//   }

//   addShipName(event: any) {
//       this.$store.commit("setShipName", event.target.value);
//   }

//   populateSelect(radar: string) {
//       const availableRadars = this.$store.getters.radars;
//       const generatedValues = [];
//       for(radar in availableRadars) {
//           generatedValues.push('<option value="abcd">ABCD</option>')
//       }
//       return generatedValues;
//   }
// }
</script>
