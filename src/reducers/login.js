import { SET_NAME, SET_TOKEN } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_NAME:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case SET_TOKEN:
    return {
      ...state,
      token: action.payload,
    };
  default:
    return state;
  }
}

export default loginReducer;
