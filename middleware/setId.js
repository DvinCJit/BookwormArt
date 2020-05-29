export default function({ store, route, redirect, params }) {
  if (params.id === ':id') {
    return redirect('/users/' + store.state.users.user._id)
  }
}
