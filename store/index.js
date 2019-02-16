export const state = () => ({
  user: null,
  auth: false
})

export const mutations = {
  login(state, payload) {
    state.auth = true
    state.user = payload
  },
  logout(state) {
    state.auth = false
    state.user = null
  }
}
