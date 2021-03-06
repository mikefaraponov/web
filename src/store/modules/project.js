import HTTP from '@/api';

const SET_PROJECT = 'SET_PROJECT';
const SET_PROJECT_SUCCESS = 'SET_PROJECT_SUCCESS';
const SET_PROJECT_FAILURE = 'SET_PROJECT_FAILURE';
const getProject = response => response.data.project;

export default {
  namespaced: true,
  state: {
    project: null,
    isLoading: false,
    isError: false,
    error: null,
  },
  getters: {},
  mutations: {
    [SET_PROJECT](state) {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    },
    [SET_PROJECT_SUCCESS](state, project) {
      state.project = project;
      state.isLoading = false;
      state.isError = false;
      state.error = null;
    },
    [SET_PROJECT_FAILURE](state, error) {
      state.isLoading = false;
      state.isError = true;
      state.error = error;
      state.project = [];
    },
  },
  actions: {
    prefetch({ commit }, id) {
      commit(SET_PROJECT);
      HTTP.get(`/v1/projects/${id}`)
        .then(getProject)
        .then(project => commit(SET_PROJECT_SUCCESS, project))
        .catch(error => commit(SET_PROJECT_FAILURE, error));
    },
  },
};
