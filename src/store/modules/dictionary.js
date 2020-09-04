// import { getDictionary } from "@/api/public";

const state = {
  DICTIONARY_DATA: []
};

const mutations = {
  ADD_DICTIONARY_DATA: (state, item) => {
    state.DICTIONARY_DATA.push(item);
  },
  INIT_DICTIONARY_DATA: (state, item) => {
    state.DICTIONARY_DATA = item;
  },
  CLEAR_DICTIONARY_DATA: state => {
    state.DICTIONARY_DATA.splice(0);
  }
};

const actions = {
  // addDictionaryData({ commit }, _) {
  //   // return new Promise((resolve, reject) => {
  //   //   getDictionary()
  //   //     .then(result => {
  //   //       console.log(result);
  //   //       commit("INIT_DICTIONARY_DATA", Object.freeze(result.data));
  //   //       resolve();
  //   //     })
  //   //     .catch(error => {
  //   //       reject(error);
  //   //     });
  //   // });
  // },
  clearDictionaryData({ commit }) {
    commit("CLEAR_DICTIONARY_DATA");
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
