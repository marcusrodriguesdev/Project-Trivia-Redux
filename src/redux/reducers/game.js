import { SET_TOKEN, SET_TIMER, RESET_TIMER } from '../actions';

const INITIAL_STATE = {
  token: {
    response_code: 0,
    response_message: 'Token Generated Successfully!',
    token: 'e0c200733f05384a37e830c2670aba1b3d5ca4fd7c541edf6a3c45034e9f8ba4',
  },
  stopWatch: {
    isTimer: false,
    resetTime: false,
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
  case RESET_TIMER:
    return {
      ...state,
      stopWatch: { ...state.stopWatch, resetTime: payload },
    };
  default:
    return state;
  }
};

export default game;
