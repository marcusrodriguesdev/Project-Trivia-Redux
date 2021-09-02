import { SET_TOKEN, REQUEST_TOKEN } from '../actions';

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
  default:
    return state;
  }
};

export default authReducer;
