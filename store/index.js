import axios from 'axios'

export const state = () => ({
  authUser: null
})

export const mutations = {
  SET_USER: function (state, user) {
    state.authUser = user
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }
  },
  login ({ commit }, { username, password, remember }) {
    return axios.post('/api/user/login', {
      username: username,
      password: password,
      remember: remember
    })
      .then((res) => {
        commit('SET_USER', res.data)
      })
      .catch((error) => {
        if (error.response.status === 401) {
          throw new Error('Bad credentials')
        }
      })
  },
  register ({ commit }, { username, password }) {
    return axios.post('/api/user/register', {
      username,
      password
    })
      .then((res) => {
        commit('SET_USER', res.data)
      })
      .catch((error) => {
        if (error.response.status === 401) {
          throw new Error(error.response.data.message)
        }
      })
  },

  logout ({ commit }) {
    return axios.post('/api/user/logout')
      .then(() => {
        commit('SET_USER', null)
      })
  }

}
