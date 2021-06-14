export const SET_LOAD_STATE = (state, value) => {
  state.didFullyLoad = value;
}

export const setLoadState = (context, { value }) => {
  context.commit('SET_LOAD_STATE', value)
}