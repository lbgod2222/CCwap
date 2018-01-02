import Vue from 'vue'
import * as types from './mutation-types'
import StoreCache from '../utils/storeCache'
import find from 'lodash/find'

let cache = new StoreCache('vuex')

export default {
  [types.INIT_USER_INFO] (state, { user }) {
    Vue.set(state, 'user', user)
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
    Vue.set(state, 'hotList', hotList)
  },
  // get new list
  [types.GET_NEW] (state, { newList }) {
    Vue.set(state, 'newList', newList)
  },
  // get article detail
  [types.GET_ARITCLE_DETAIL] (state, {articleDetail}) {
    Vue.set(state, 'articleDetail', articleDetail)
  },
  // get article comments
  [types.GET_COMMENT] (state, {comments}) {
    Vue.set(state, 'comments', comments)
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