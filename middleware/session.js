export default ({ store, route, redirect }) => {
  if (!store.state.auth && !['/', '/callback'].includes(route.path)) {
    return redirect('/')
  }
}
