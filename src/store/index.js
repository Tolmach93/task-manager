import Vue from 'vue'
import Vuex from 'vuex'
import { STORE_MODULES } from '@/constants'

import tasks from './tasks'
import groups from './groups'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    [STORE_MODULES.TASKS]: tasks,
    [STORE_MODULES.GROUPS]: groups,
  },
})
