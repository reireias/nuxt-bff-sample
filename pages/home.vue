<template>
  <div>
    <h1>Home</h1>
    <p>name: {{ $store.state.user.name }}</p>
    <img :src="$store.state.user.avatarUrl" width="100px" height="100px">
    <br>
    <a
      href="/api/auth/logout"
      class="button--green"
    >Logout</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null
    }
  },
  fetch({ store, redirect }) {
    // 未認証の場合、リダイレクトする
    if (!store.state.auth) {
      return redirect('/')
    } else {
      this.user = store.state.user
    }
  }
}
</script>
