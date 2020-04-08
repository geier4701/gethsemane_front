import Vue from "vue";
import Vuex from "vuex";
import axios, { AxiosError } from "axios"
import { getResourceRequest } from "../api/request"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    shipName: ''
  },
  mutations: {
    setShipName(state, shipName) {
      state.shipName = shipName
    }
  },
  getters: {
    shipName: state => state.shipName
  },
  actions: {
    loadShip({ commit }, payload) {
      getResourceRequest('loadship/', payload['id']).then(response => {
        commit('setShipName', response['shipName']);
      });
    }
  },
  modules: {}
});
