import Vue from "vue";
import Vuex from "vuex";
import { getResourceRequest, getResourcesRequest } from "../api/request";
import Ship from "../types/Ship";
import Radar from "../types/Radar";
import JumpDrive from "@/types/JumpDrive";
import ImpulseEngine from "@/types/ImpulseEngine";
import Computer from "@/types/Computer";
import Armour from "@/types/Armour";
import ShipClass from "@/types/ShipClass";
import Weapon from "@/types/Weapon";
import Ammunition from "@/types/Ammunition";
import Condition from "@/types/Condition";
import Action from "@/types/Action";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    characterId: 1,
    ship: new Ship(
      null,
      "Your Ship",
      new Radar(1, "Scanny", 15, 45, "Active", 5),
      new JumpDrive(1, "Cricket", 25, 35, 40),
      new ImpulseEngine(1, "Pusher", 10, 25, 15, 100),
      new Computer(1, "Dorito", 15, 0, 10, 50),
      new Armour(4, "Paper", 10, 0, "Ablative"),
      new ShipClass(2, "Scout", 50, 25, 75, 70),
      [
        new Weapon(1, "Laser Pointer", 10, 10, 15, 1000, 10, "Crystal", 100000),
        new Weapon(2, "Totalator", 20, 25, 5, 100, 25, "Missile", 100)
      ],
      [
        new Ammunition(6, "Red Crystal", 5, 0, "Energy", "Crystal", 100),
        new Ammunition(8, "Tiem for bang", 15, 0, "Explosive", "Missile", 10)
      ]
    ),
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
      new Armour(7, "Cardboard", 15, 0, "Ablative")
    ],
    shipClasses: [
      new ShipClass(2, "Scout", 50, 25, 75, 70),
      new ShipClass(8, "Interceptor", 60, 30, 85, 80)
    ],
    weapons: [
      new Weapon(1, "Laser Pointer", 10, 10, 15, 1000, 10, "Crystal", 100000),
      new Weapon(2, "Totalator", 20, 25, 5, 100, 25, "Missile", 100)
    ],
    ammunitions: [
      new Ammunition(6, "Red Crystal", 5, 0, "Energy", "Crystal", 100),
      new Ammunition(8, "Tiem for bang", 15, 0, "Explosive", "Missile", 10)
    ],
    programs: [],
    subroutines: [],
    conditions: [],
    actions: []
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
    },
    setWeapons(state, weapons) {
      state.weapons = weapons;
    },
    setShipWeapon(state, weapon) {
      state.ship.weapons.push(weapon);
    },
    removeShipWeapon(state, weaponId) {
      for (let i = 0; i < state.ship.weapons.length; i++) {
        if (state.ship.weapons[i].id === weaponId) {
          state.ship.weapons.splice(i, 1);
          break;
        }
      }
    },
    setAmmunitions(state, ammunitions) {
      state.ship.ammunitions = ammunitions;
    },
    setShipAmmunition(state, ammunition) {
      state.ship.ammunitions.push(ammunition);
    },
    removeShipAmmunition(state, ammunitionId) {
      for (let i = 0; i < state.ship.ammunitions.length; i++) {
        if (state.ship.ammunitions[i].id === ammunitionId) {
          state.ship.ammunitions.splice(i, 1);
          break;
        }
      }
    },
    setCondition(state, condition) {
      state.conditions.push(condition);
    },
    setConditions(state, conditions) {
      state.conditions = conditions;
    },
    removeCondition(state, idx) {
      state.conditions.splice(idx, 1);
    },
    setAction(state, action) {
      state.actions.push(action);
    },
    setActions(state, actions) {
      state.actions = actions;
    },
    removeAction(state, idx) {
      state.actions.splice(idx, 1);
    },
    setSubroutine(state, subroutine) {
      state.subroutines.push(subroutine);
    },
    setSubroutines(state, subroutines) {
      state.subroutines = subroutines;
    },
    removeSubroutine(state, idx) {
      state.subroutines.splice(idx, 1);
    },
    clearSubroutines(state) {
      state.subroutines = [];
    },
    clearActionsConditions(state) {
      state.conditions = [];
      state.actions = [];
    },
    setProgram(state, program) {
      state.programs.push(program);
    },
    setShipProgram(state, program) {
      state.ship.program = program;
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
    shipClasses: state => state.shipClasses,
    weapons: state => state.weapons,
    ammunitions: state => state.ammunitions,
    programs: state => state.programs,
    subroutines: state => state.subroutines,
    conditions: state => state.conditions,
    actions: state => state.actions
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
    },
    saveShip({ commit }, payload) {
      // SAVE THIS SHIP
    }
  },
  modules: {}
});
