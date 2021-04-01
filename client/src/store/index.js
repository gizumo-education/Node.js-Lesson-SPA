import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginUser: {
      userName: '',
      userId: null,
    },
    isAuthenticated: false,
    todoList: [],
    // completedTodoList: [],
  },
  getters: {
    loginUser: (state) => state.loginUser,
    isAuthenticated: (state) => state.isAuthenticated,
    todoList: (state) => state.todoList,
    completedTodoList: (state, getters) => {
      const { todoList } = getters;
      const completedTodoList = todoList.filter((v) => v.isCompleted);
      return completedTodoList;
    },
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
    updateTodoList(state, todoList) {
      state.todoList = todoList;
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
    async addTodo({ dispatch }, todo) {
      await axios.post(`${BASE_URL}/todo`, todo);
      dispatch('updateTodoList');
    },
    async deleteTodo({ dispatch }, todo) {
      await axios.delete(`${BASE_URL}/todo/${todo.id}`, todo);
      dispatch('updateTodoList');
    },
  },
});
