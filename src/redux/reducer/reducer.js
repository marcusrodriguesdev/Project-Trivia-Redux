import { LOGGED_INFO, GET_TOKEN } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
  token: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGGED_INFO:
    return {
      ...state,
      name: action.payload,
    };
  case GET_TOKEN:
    return {
      ...state,
      token: action.payload.token,
    };
  default:
    return state;
  }
}

export default user;
