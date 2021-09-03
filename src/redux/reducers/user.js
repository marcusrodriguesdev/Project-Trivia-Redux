import { SET_DATA_USER } from '../actions';

const ESTADO_INICIAL = {
  user: '',
  email: '',
  score: 0,
};

function userReducer(state = ESTADO_INICIAL, action) {
  const { payload, type } = action;
  switch (type) {
  case SET_DATA_USER:
    return {
      ...state,
      ...payload,
    };
  default:
    return state;
  }
}

export default userReducer;
