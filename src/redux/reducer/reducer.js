import { actions } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
  token: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actions.LOGGED_INFO:
    return {
      ...state,
      name: action.payload,
    };
  case actions.GET_TOKEN:
    return {
      ...state,
      token: action.payload.token,
    };
  default:
    return state;
  }
}

export default user;
