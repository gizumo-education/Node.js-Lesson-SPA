import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

Vue.use(Vuex);

const user = {
  namespaced: true,
  state: {
    loginUser: {
      userName: '',
      userId: null,
    },
    isAuthenticated: false,
  },
  getters: {
    loginUser: (state) => state.loginUser,
    isAuthenticated: (state) => state.isAuthenticated,
  },
  mutations: {
    updateLoginUser(state, user) {
      state.loginUser = user;
    },
    resetLoginUser(state) {
      state.loginUser = {
        userName: '',
        userId: null,
      };
    },
    updateIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
    },
  },
  actions: {
    async updateLoginUser({ commit }, param) {
      const res = await axios
        .post(`${BASE_URL}/login`, param)
        .then((resp) => resp)
        .catch((err) => err.response);

      if (res.status === 200) {
        commit('updateLoginUser', res.data);
        commit('updateIsAuthenticated', true);
      } else {
        commit('resetLoginUser');
        commit('updateIsAuthenticated', false);
      }
    },
    async logout({ commit }) {
      await axios.post(`${BASE_URL}/logout`);
      commit('resetLoginUser');
      commit('updateIsAuthenticated', false);
    },
  },
};

const todo = {
  namespaced: true,
  state: {
    todoList: [],
  },
  getters: {
    todoList: (state) => state.todoList,
  },
  mutations: {
    updateTodoList(state, todoList) {
      state.todoList = todoList;
    },
  },
  actions: {
  },
};

export default new Vuex.Store({
  modules: {
    user: user,
    todo: todo,
  },
  actions: {
    async checkAuthenticated({ commit }) {
      const res = await axios
        .get(`${BASE_URL}/user`)
        .then((resp) => resp)
        .catch((err) => err.response);

      if (res.status === 200) {
        commit('updateLoginUser', res.data.user);
        commit('updateIsAuthenticated', true);
      } else {
        commit('resetLoginUser');
        commit('updateIsAuthenticated', false);
      }
    },
    async updateTodoList({ commit }) {
      const todoList = await axios
        .get(`${BASE_URL}/todo`)
        .then((res) => res.data);
      commit('updateTodoList', todoList);
    },
    async updateTodo({ dispatch }, todo) {
      await axios.put(`${BASE_URL}/todo/${todo.id}`, todo);
      dispatch('updateTodoList');
    },
  },
});
