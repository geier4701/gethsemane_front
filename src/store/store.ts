import Vue from "vue";
import Vuex from "vuex";
import { getResourceRequest } from "../api/request";
import Ship from "../types/Ship";
import Radar from "../types/Radar";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ship: new Ship(null, "Your Ship"),
    radars: [
      new Radar(1, "Scanny", 15, 45, "Active", 5),
      new Radar(2, "Scannist", 20, 60, "Active", 10)
    ]
  },
  mutations: {
    setShipName(state, shipName) {
      state.ship.name = shipName;
    }
  },
  getters: {
    ship: state => state.ship,
    radars: state => state.radars
  },
  actions: {
    loadShip({ commit }, payload) {
      getResourceRequest("ship", payload["id"]).then(response => {
        commit("setShipName", response["shipName"]);
      });
    }
  },
  modules: {}
});
