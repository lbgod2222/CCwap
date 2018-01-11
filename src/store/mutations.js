import Vue from 'vue'
import aschJS from 'asch-js'
import * as types from './mutation-types'
import StoreCache from '../utils/storeCache'
import getRealTime from '../utils/getRealTime'
import toPhoto from '../utils/toPhoto'
import find from 'lodash/find'
// import { Array } from 'core-js/library/web/timers';

let cache = new StoreCache('vuex')
function addTimeAndAva(list) {
  for (let i=0; i<list.articles.length; i++) {
    list.articles[i].realtime = getRealTime.getCorrectTimestamp(list.articles[i].timestamp)
    list.articles[i].photo = toPhoto.toAvatar(list.articles[i].authorId)
  }
}

export default {
  // login now
  [types.SWITCH_LOGIN] (state) {
    // standalone switcher
    Vue.set(state, 'isLogin', !state.isLogin)
  },
  [types.LOGIN] (state, { secret }) {
    // set the base info of secret
    let keypair = aschJS.crypto.getKeys(secret)
    let address = aschJS.crypto.getAddress(keypair.publicKey)
    Vue.set(state, 'user_secret', secret)
    Vue.set(state, 'user_address', address)
  },
  [types.UPDATE_USER_INFO] (state, { userInfo, address }) {
    userInfo.account.photo = toPhoto.toAvatar(address)
    Vue.set(state, 'user_info', userInfo)
  },
  [types.UPDATE_LANG] (state, lang) {
    Vue.set(state, 'lang', lang)
    cache.set('lang', lang)
  },
  [types.INIT_CONTACTS] (state, { contacts }) {
    Vue.set(state, 'contacts', contacts)
  },
  [types.INIT_TIMETIME] (state, { timeline }) {
    Vue.set(state, 'timeline', timeline)
  },
  // get hot list
  [types.GET_HOT] (state, { hotList }) {
    console.log(hotList)
    addTimeAndAva(hotList)
    Vue.set(state, 'hotList', hotList.articles)
  },
  // get new list
  [types.GET_NEW] (state, { newList }) {
    addTimeAndAva(newList)
    Vue.set(state, 'newList', newList.articles)
  },
  // get article detail
  [types.GET_ARITCLE_DETAIL] (state, {articleDetail}) {
    console.log('detail!')
    Vue.set(state, 'articleDetail', articleDetail)
  },
  // get article comments
  [types.GET_COMMENT] (state, {comments}) {
    Vue.set(state, 'comments', comments)
  },
  // in list the transferDetail
  [types.LIST_TRANSFERDETAIL] (state, {item}) {
    Vue.set(state, 'transferDetail', item)
  },
  // list add new contents
  [types.ADD_LIST]  (state, {list, type}) {
    switch (type) {
    case 'hot':
      console.log('hot')
      let origin = state.hotList
      console.log('orgin:', origin)
      let mixed = Array.prototype.concat.apply(origin, list)
      console.log('mixed:', mixed)
      Vue.set(state, 'hotList', mixed)
      console.log('after:', mixed)
      break
    case 'new':
      console.log('new')
      let originN = state.newList
      let mixedN = Array.prototype.concat.apply(originN, list)
      Vue.set(state, 'newList', mixedN)
      break
    }
  },
  [types.UPDATE_TIMETIME] (state, { mid, type }) {
    let item = find(state.timeline, p => p.id === mid)
    let update = {}
    switch(type) {
    case 'like':
      update.like_count = item.like_count + 1
      update.liked = true
      break
    case 'unlike':
      update.like_count = item.like_count - 1
      update.liked = false
      break
    }
    // Yes, Object.assign can update state and UI component at same time.
    item = Object.assign(item, update)
  }
}