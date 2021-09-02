import { LOGGED_INFO } from '../actions';

const INITIAL_STATE = { token: '' };

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGGED_INFO:
    return { token: action.payload.token };
  default:
    return state;
  }
}

export default user;
