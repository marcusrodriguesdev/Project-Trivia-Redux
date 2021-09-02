const ESTADO_INICIAL = {
  nome: '',
  email: '',
};
function userReducer(state = ESTADO_INICIAL, action) {
  switch (action.type) {
  case 'CLICK_BUTTON_LOGIN':

    return {
      ...state,
      email: action.email,
    };

  default:
    return state;
  }
}

export default userReducer;
