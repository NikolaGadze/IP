import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      commit('setUser', userCredential.user);
    },
    async logout({ commit }) {
      try {
        await auth.signOut();
        commit('clearUser');
      } catch (error) {
        console.error('Logout error:', error);
      }
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.user;
    },
    getUser(state) {
      return state.user;
    },
  },
});