import Vue from "vue";
import Vuex from "vuex";
import { getResourceRequest, getResourcesRequest } from "../api/request";
import Ship from "../types/Ship";
import Radar from "../types/Radar";
import JumpDrive from "@/types/JumpDrive";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    characterId: 1,
    ship: new Ship(
      1,
      "Your Ship",
      new Radar(1, "Scanny", 15, 45, "Active", 5),
      new JumpDrive(2, "Grasshopper", 35, 55, 50)
    ),
    radars: [
      new Radar(1, "Scanny", 15, 45, "Active", 5),
      new Radar(2, "Scannist", 20, 60, "Active", 10)
    ],
    jumpDrives: [
      new JumpDrive(1, "Cricket", 25, 35, 40),
      new JumpDrive(2, "Grasshopper", 35, 55, 50)
    ]
  },
  mutations: {
    setShipName(state, shipName) {
      state.ship.name = shipName;
    },
    setRadars(state, radars) {
      state.radars = radars;
    },
    setJumpDrives(state, jumpDrives) {
      state.jumpDrives = jumpDrives;
    }
  },
  getters: {
    characterId: state => state.characterId,
    ship: state => state.ship,
    radars: state => state.radars,
    jumpDrives: state => state.jumpDrives
  },
  actions: {
    loadShip({ commit }, payload) {
      getResourceRequest("ship", payload["id"]).then(response => {
        commit("setShipName", response["shipName"]);
      });
    },
    loadCharacterComponents({ commit }, payload) {
      const componentType = payload["componentType"];
      const characterId = payload["characterId"];
      getResourcesRequest("character", characterId, componentType).then(
        response => {
          commit("set" + componentType, response[componentType]);
        }
      );
    }
  },
  modules: {}
});
