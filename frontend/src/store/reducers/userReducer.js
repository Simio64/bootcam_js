const default_state = {
  code: 'NO INIT',
  id: '',
  user: '',
  token: '',
  imagen: 'default.jpg'
}

export const user = (state = default_state, actions) => {
  switch (actions.type) {
    case '@user/init':
      return actions.payload

    case '@user/fail':
      return {
        code: actions.payload.code,
        id: '',
        user: '',
        token: '',
        imagen: 'default.jpg'
      }

    case '@user/destroy':
      return default_state

    default:
      return state
  }
}