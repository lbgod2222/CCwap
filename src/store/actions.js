import axios from 'axios'
import * as types from './mutation-types'

export function getLoginUser({commit}) {
  axios.get('/user_login.json').then(res => {
    let user = res.data.user
    commit(types.INIT_USER_INFO, {
      user
    })
  })
}

export function setLang({ commit }, lang) {
  commit(types.UPDATE_LANG, lang)
}

export function getContacts({commit}) {
  axios.get('/contacts.json').then(res => {
    let contacts = res.data
    commit(types.INIT_CONTACTS, {
      contacts
    })
  })
}

export function getTimeline({commit}, callback = () => {}) {
  axios.get('/timeline.json').then(res => {
    let timeline = res.data
    commit(types.INIT_TIMETIME, {
      timeline
    })
    callback()
  })
}
// get hot list
export function getHotList({commit}, {limit, offset}) {
  axios.get('/articles', {
    params: {
      sortBy: undefined,
      limit: limit,
      offset: offset
    }
  }).then(res => {
    let hostList = res.data
    commit(types.GET_HOT, {
      hostList
    })
  })
}
// get new list
export function getNewList({commit}, callback = () => {}) {
  axios.get('/articles', {
    params: {
      sortBy: 'timestamp',
      limit: limit,
      offset: offset
    }
  }
).then(res => {
    let newList = res.data
    commit(types.GET_NEW, {
      newList
    })
    callback()
  })
}

export function updateTimeline({commit}, { mid, type }) {
  commit(types.UPDATE_TIMETIME, {
    mid,
    type
  })
}

export function getHot({commit}, ) {}