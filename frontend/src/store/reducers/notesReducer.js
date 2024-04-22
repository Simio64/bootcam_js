export const notes = (state = [], actions) => {
  switch (actions.type) {
    case '@notes/init':
      return actions.payload

    case '@notes/create_new_note':
      return [actions.payload, ...state]

    default:
      return state
  }
}