import { FETCH_API, FETCH_API_ERROR } from '../action';

const INITIAL_STATE = {
  token: [],
  error: '',
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
  case FETCH_API:
    return {
      ...state,
      token: payload,
    };
  case FETCH_API_ERROR:
    return {
      ...state,
      error: payload,
    };
  default:
    return state;
  }
};

export default reducer;
