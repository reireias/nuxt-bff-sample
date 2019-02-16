import axios from 'axios'

export default async ({ store, route, redirect }) => {
  // 認証済みの場合は何もしない
  if (store.state.auth) {
    return
  }

  if (route.path !== '/callback') {
    // サーバーのsessionからuser情報を取得する
    const res = await axios.get('/api/session')
    if (res.data.user) {
      store.commit('login', res.data.user)
      if (route.path === '/') {
        return redirect('/home')
      }
    } else if (route.path !== '/') {
      // 無限リダイレクトにならないように、パスが"/"の場合は何もしない
      return redirect('/')
    }
  }
}
