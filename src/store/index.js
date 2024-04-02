import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //LOCAL
   url: "http://legalcasebackend.test/api",
    //NUBE BACK
      // url:"https://sisge.net:80/api",
    token: null,
    user: {
      id: null,
      usu_rol: null,
      name: null,
      email: null,
      token: null,
      abo_id: null,
      datos: {
        dni: null,
        apellido_paterno: null,
        apellido_materno: null,
        nombres: null,
        telefono: null,
        correo: null
      }
    },

  },
  getters: {
    get__url(state) {
      return state.url;
    },
    get__token(state) {
      return state.user.token;
    },
    get__user(state) {
      return state.user;
    },
    get__sector(state) {
      return state.sector;
    },
    get__idusu(state) {
      return state.user.id;
    },
    get__aboid(state) {
      return state.user.abo_id;
    },

    get__assid(state) {
      return state.user.ass_id;
    },
  },
  mutations: {
    mt_set_user(state, payload) {
      state.user = payload;
    },

    mt_set_assid(state, id) {
      state.ass_id = id;
    },

    mt_set_refresh(state, user) {
      state.user = user;
    },
    mt_set_aboid(state, id) {
      state.aboid = id;
    },
    mt_logout_auth(state) {
      state.user = {
        id: null,
        name: null,
        email: null,
        last_name: null,
        document_type: null,
        dni: null,
        password: null,
        rol_id: null,
        abo_id: null,
        state: null,
        roles: [],
        permissions: [],
      };
      state.aboid = null;
      state.ass_id = null;
    },
  },
  modules: {
  },
  plugins: [
    createPersistedState({
      reducer: (persistedState) => {
        const stateFilter = JSON.parse(JSON.stringify(persistedState));
        return stateFilter;
      }
    })
  ]
})


