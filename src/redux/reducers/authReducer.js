import { SET_TOKEN,
  REQUEST_TOKEN,
  SET_GRAVATAR,
  SET_PLAYER } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  token: '',
  isFetchingToken: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_TOKEN:
    return { ...state, isFetchingToken: true };
  case SET_TOKEN:
    return { ...state, token: action.payload, isFetchingToken: false };
  case SET_GRAVATAR:
    return { ...state, gravatar: action.payload };
  case SET_PLAYER:
    return { ...state, name: action.payload.name, email: action.payload.email };
  default:
    return state;
  }
};

export default authReducer;
