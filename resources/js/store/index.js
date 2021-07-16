import Vue from 'vue'
import Vuex from 'vuex'

import * as article from './modules/article.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        article
    },
    state: {
        slug: ''

    },
    actions: {

    },

    mutations: {
        SET_SLUG(state, payload){
            return state.slug = payload;
        },

    },
    getters: {


    },

})
