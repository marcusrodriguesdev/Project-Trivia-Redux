import { SET_TOKEN, SET_TIMER, RESET_TIMER } from '../actions';

const INITIAL_STATE = {
  token: {
    response_code: 0,
    response_message: 'Token Generated Successfully!',
    token: '1bda73d2efdf1eb547b1d2db4c69f23401710aac87b3aeadf08698a3b09170e7',
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
