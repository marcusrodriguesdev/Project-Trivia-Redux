import { LOGGED_INFO } from '../actions';

const INITIAL_STATE = { email: '', name: '' };

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGGED_INFO:
    return {
      ...state,
      name: action.payload,
    };
  default:
    return state;
  }
}

export default user;
