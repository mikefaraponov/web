import HTTP from '@/api';

const SET_PROJECTS = 'SET_PROJECTS';
const SET_PROJECTS_SUCCESS = 'SET_PROJECTS_SUCCESS';
const SET_PROJECTS_FAILURE = 'SET_PROJECTS_FAILURE';
const UPDATE_PROJECT_BY_ID = 'UPDATE_PROJECT_BY_ID';
const getProjects = response => response.data.projects;

export default {
  getters: {},
  namespaced: true,
  state: {
    projects: [],
    isLoading: false,
    isError: false,
    error: null,
  },
  mutations: {
    [SET_PROJECTS](state) {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    },
    [SET_PROJECTS_SUCCESS](state, projects) {
      state.projects = projects;
      state.isLoading = false;
      state.isError = false;
      state.error = null;
    },
    [SET_PROJECTS_FAILURE](state, error) {
      state.isLoading = false;
      state.isError = true;
      state.error = error;
      state.projects = [];
    },
    [UPDATE_PROJECT_BY_ID](state, payload) {
      const findById = project => project.id === payload.project_id;
      const i = state.projects.findIndex(findById);
      state.projects[i].builds.push(payload);
    },
  },
  actions: {
    prefetch({ commit }) {
      commit(SET_PROJECTS);
      HTTP.get('/v1/projects')
        .then(getProjects)
        .then(projects => commit(SET_PROJECTS_SUCCESS, projects))
        .catch(error => commit(SET_PROJECTS_FAILURE, error));
    },
    update({ commit }, payload) {
      commit(UPDATE_PROJECT_BY_ID, payload);
    },
  },
};
