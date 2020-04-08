<template>
    <div>
        <p><label for="shipName">Your ship name: </label>{{ $store.getters.shipName }}</p>
        <input @change="changed" name="shipName">
    </div>
</template>

<script>
import Axios from 'axios'
export default {
    mounted () {
        this.$store.dispatch('loadShip', {'id': 1})
    },
    methods: {
        changed: function(event) {
            this.$store.commit("setShipName", event.target.value)
        }
    }
}
</script>
