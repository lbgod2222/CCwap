import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
import StoreCache from '../utils/storeCache'

Vue.use(Vuex)
let cache = new StoreCache('vuex')

const state = {
  // store for user base
  user_address: '',
  user_secret: '',
  // store for user info / update
  user_info: {},
  // login state
  isLogin: false,
  lang: cache.get('lang') || 'zh',
  contacts: [],
  timeline: [],
  // hot list
  hotList: [],
  newList: [],
  articleDetail: [],
  comments: [],
  transferDetail: {}
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})