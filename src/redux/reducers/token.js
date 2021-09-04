import { REQUEST_TOKEN_SUCCESS, REQUEST_TOKEN_ERROR } from '../actions/index';

const INITIAL_STATE = {
  token: '',
  error: null,
};

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_TOKEN_SUCCESS:
    return { ...state, token: action.payload };
  case REQUEST_TOKEN_ERROR:
    return { ...state, error: action.payload };
  default:
    return state;
  }
};

export default token;
