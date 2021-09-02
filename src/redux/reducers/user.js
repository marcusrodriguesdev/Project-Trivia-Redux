import { CLICK_BUTTON_LOGIN } from '../actions';

const ESTADO_INICIAL = {
  nome: '',
  email: '',
};

function userReducer(state = ESTADO_INICIAL, action) {
  const { payload, type } = action;
  switch (type) {
  case CLICK_BUTTON_LOGIN:
    return {
      ...state,
      ...payload,
    };
  default:
    return state;
  }
}

export default userReducer;
