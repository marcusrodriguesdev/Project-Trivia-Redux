import { SET_TOKEN, SET_TIMER } from '../actions';

const INITIAL_STATE = {
  token: {
    response_code: 0,
    response_message: 'Token Generated Successfully!',
    token: '9469b355cc56ca2e0595e9b94bdc46dd03e025a5eab8bc94df54ab5563a72a42',
  },
  stopWatch: {
    isTimer: false,
  },
};

const game = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
  case SET_TOKEN:
    return {
      ...state,
      token: { ...payload },
    };
  case SET_TIMER:
    return {
      ...state,
      stopWatch: { ...state.stopWatch, isTimer: payload },
    };
  default:
    return state;
  }
};

export default game;
