import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

interface User {
  email: string;
  id: string;
  accessToken: string;
}

export default new Vuex.Store({
  state: {
    user: null as User | null,
    sensors: [],
    sensorDetails: {},
    sensorValues: []
  },
  mutations: {
    setUser(state, user: User) {
      state.user = user
    },
    logout(state) {
      state.user = null
    },
    setSensors(state, sensors) {
      state.sensors = sensors
    },
    setSensorDetails(state, sensor) {
      state.sensorDetails = sensor 
    },
    setSensorValues(state, values) {
      state.sensorValues = values 
    }
  },
  actions: {
    authenticate ( {commit}, data ) {
      axios({
        url: "http://localhost:3030/authentication",
        method: 'POST',
        data: {
          "strategy": "local",
          "email": data.email,
          "password": data.password
        }
      }).then( (response: any) => {
        commit("setUser", {
          email: response.data.user.email,
          id: response.data.user._id,
          accessToken: response.data.accessToken
        })
      })
    },
    logout ( {commit} ) {
      commit("logout")
      commit("setSensors", [])
    },
    getSensors ( {commit, getters} ) {
      axios({
        url: "http://localhost:3030/sensors",
        headers: {
          authorization: `Bearer ${getters.user.accessToken}`
        }
      }).then( (response: any) => {
        commit('setSensors', response.data.data)
      })
    },
    getSensorDetails ( {commit, getters} , sensorId) {
      axios({
        url: `http://localhost:3030/sensors/${sensorId}`,
        headers: {
          authorization: `Bearer ${getters.user.accessToken}`
        }
      }).then( (response: any) => {
        commit('setSensors', response.data)
      })
    },
    getSensorValues ( {commit, getters} , sensorId) {
      axios({
        url: `http://localhost:3030/measurements/${sensorId}?period=last`,
        headers: {
          authorization: `Bearer ${getters.user.accessToken}`
        }
      }).then( (response: any) => {
        console.log(response.data)
        commit('setSensorValues', response.data)
      })
    },
  },
  getters: {
    user: (state) => {
      return state.user
    },
    sensors: (state) => {
      return state.sensors
    },
    sensorDetails: (state) => {
      return state.sensorDetails
    },
    sensorValues: (state) => {
      return state.sensorValues
    }
  },
  modules: {
  },
  plugins: [ vuexLocal.plugin ]
})
