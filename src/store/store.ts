import Vue from "vue";
import Vuex from "vuex";
import { getResourceRequest, getResourcesRequest } from "../api/request";
import Ship from "../types/Ship";
import Radar from "../types/Radar";
import JumpDrive from "@/types/JumpDrive";
import ImpulseEngine from '@/types/ImpulseEngine';
import Computer from '@/types/Computer';
import Armour from '@/types/Armour';
import ShipClass from '@/types/ShipClass';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    characterId: 1,
    ship: new Ship(null, "Your Ship"),
    radars: [
      new Radar(1, "Scanny", 15, 45, "Active", 5),
      new Radar(2, "Scannist", 20, 60, "Active", 10)
    ],
    jumpDrives: [
      new JumpDrive(1, "Cricket", 25, 35, 40),
      new JumpDrive(2, "Grasshopper", 35, 55, 50)
    ],
    impulseEngines: [
      new ImpulseEngine(1, "Pusher", 10, 25, 15, 100),
      new ImpulseEngine(2, "Shover", 15, 35, 20, 200)
    ],
     computers: [
       new Computer(1, "Dorito", 15, 0, 10, 50),
       new Computer(2, "Pentium II", 20, 0, 15, 65)
     ],
     armours: [
       new Armour(4, "Paper", 10, 0, "Ablative"),
       new Armour(7, "Cardboard", 15, 0, "Ablative"),
      ],
      shipClasses: [
        new ShipClass(2, "Scout", 50, 25, 75, 70),
        new ShipClass(8, "Interceptor", 60, 30, 85, 80)
      ]
  },
  mutations: {
    setShip(state, ship) {
      state.ship = ship;
    },
    setShipName(state, shipName) {
      state.ship.name = shipName;
    },
    setRadars(state, radars) {
      state.radars = radars;
    },
    setShipRadar(state, radar) {
      state.ship.radar = radar;
    },
    setJumpDrives(state, jumpDrives) {
      state.jumpDrives = jumpDrives;
    },
    setShipJumpDrive(state, jumpDrive) {
      state.ship.jumpDrive = jumpDrive;
    },
    setShipImpulseEngine(state, impulseEngine) {
      state.ship.impulseEngine = impulseEngine;
    },
    setComputers(state, computers) {
      state.computers = computers;
    },
    setShipComputer(state, computer) {
      state.ship.computer = computer;
    },
    setArmours(state, armours) {
      state.armours = armours;
    },
    setShipArmour(state, armour) {
      state.ship.armour = armour;
    },
    setShipClasses(state, shipClasses) {
      state.shipClasses = shipClasses;
    },
    setShipClass(state, shipClass) {
      state.ship.shipClass = shipClass;
    }
  },
  getters: {
    characterId: state => state.characterId,
    ship: state => state.ship,
    radars: state => state.radars,
    jumpDrives: state => state.jumpDrives,
    impulseEngines: state => state.impulseEngines,
    computers: state => state.computers,
    armours: state => state.armours,
    shipClasses: state => state.shipClasses
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
