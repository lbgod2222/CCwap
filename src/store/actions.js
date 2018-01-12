import axios from 'axios'
// import aschJS from 'asch-js'
import * as types from './mutation-types'

// const base
// const baseUrl = 'http://testnet.cctime.org:4096/api/dapps/d352263c517195a8b612260971c7af869edca305bb64b471686323817e57b2c1'

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
export function getHotList({commit}, {limit, offset, isAdd}) {
  axios.get('/articles', {
    params: {
      sortBy: undefined,
      limit: limit,
      offset: offset
    }
  }).then(res => {
    let hotList = res
    if (isAdd === false) {
      commit(types.GET_HOT, {
        hotList
      })
    } else {
      commit(types.ADD_LIST, {
        list: hotList,
        type: 'hot'
      })
    }
  })
}
// get new list
export function getNewList({commit}, {limit, offset, isAdd}) {
  axios.get('/articles', {
    params: {
      sortBy: 'timestamp',
      limit: limit,
      offset: offset
    }
  }).then(res => {
    let newList = res
    if (isAdd === false) {
      commit(types.GET_NEW, {
        newList
      })
    } else {
      commit(types.ADD_LIST, {
        list: newList,
        type: 'new'
      })
    }
  })
}

// get article detail
export function getArticleDeatil({commit}, {id}) {
  return axios.get(`/articles/${id}`)
}

// get article comment
export function getArticleComment({commit}, {id, offset, limit}) {
  return axios.get(`/articles/${id}/comments`, {
    params: {
      sortBy: 'timestamp:desc',
      offset: offset,
      limit: limit
    }
  })
}

// get transactions records
export function getTransactionRecords({commit}, {limit, offset, ownerId, currency}) {
  return axios.get('/transfers/', {
    params: {
      limit: limit,
      offset: offset,
      ownerId: ownerId,
      currency: currency
    }
  })
}

// transaction actions
export function getUserInfo({commit}, {secret, address}) {
  return axios.get(`/accounts/${address}`)
  .then(res => {
    console.log(res)
    if (res.success) {
      console.log('get user info!!!!!!!!!!!!!!!!!!!')
      commit('UPDATE_USER_INFO', {
        userInfo: res,
        address: address
      })
    }
  })
}
// export function getHot({commit}, ) {}