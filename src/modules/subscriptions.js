import HTTP from '@/api';

const initialState = {
  subscriptions: [],
  isLoading: false,
  isError: false,
  error: null,
};

const SET_SUBSCRIPTIONS = 'SET_SUBSCRIPTIONS';
const SET_SUBSCRIPTIONS_SUCCESS = 'SET_SUBSCRIPTIONS_SUCCESS';
const SET_SUBSCRIPTIONS_FAILURE = 'SET_SUBSCRIPTIONS_FAILURE';
const SUBSCRIBE_SUCCESS = 'SUBSCRIBE_SUCCESS';
const UNSUBSCRIBE_SUCCESS = 'UNSUBSCRIBE_SUCCESS';

const mutations = {
  [SUBSCRIBE_SUCCESS](state, id) {
    const findById = o => o.id === id;
    const i = state.subscriptions.findIndex(findById);
    state.subscriptions[i].subscribed = true;
  },
  [UNSUBSCRIBE_SUCCESS](state, id) {
    const findById = o => o.id === id;
    const i = state.subscriptions.findIndex(findById);
    state.subscriptions[i].subscribed = false;
  },
  [SET_SUBSCRIPTIONS](state) {
    state.isLoading = true;
    state.isError = false;
    state.error = null;
  },
  [SET_SUBSCRIPTIONS_SUCCESS](state, subscriptions) {
    state.isLoading = false;
    state.isError = false;
    state.error = null;
    state.subscriptions = subscriptions;
  },
  [SET_SUBSCRIPTIONS_FAILURE](state, error) {
    state.isLoading = false;
    state.isError = true;
    state.error = error;
    state.subscriptions = [];
  },
};

const actions = {
  prefetch({ commit, dispatch }) {
    commit(SET_SUBSCRIPTIONS);
    dispatch('ui/load', null, { root: true });
    HTTP.get('/v1/subscriptions')
      .then(response => response.data.subscriptions)
      .then(subscriptions => commit(SET_SUBSCRIPTIONS_SUCCESS, subscriptions))
      .then(() => dispatch('ui/unload', null, { root: true }))
      .catch(error => commit(SET_SUBSCRIPTIONS_FAILURE, error));
  },
  subscribe({ commit }, id) {
    HTTP.post('/v1/subscriptions', { id })
      .then(() => commit(SUBSCRIBE_SUCCESS, id));
  },
  unsubscribe({ commit }, id) {
    HTTP.delete(`/v1/subscriptions/${id}`)
      .then(() => commit(UNSUBSCRIBE_SUCCESS, id));
  },
};

const getters = {

};

export default {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
  getters,
};
