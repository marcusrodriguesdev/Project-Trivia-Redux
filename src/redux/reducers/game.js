import { SET_TOKEN, SET_TIMER, RESET_TIMER, RESET_STATE_GAME } from '../actions';

const INITIAL_STATE = {
  token: {
    response_code: 0,
    response_message: 'Token Generated Successfully!',
    token: '40a107e38408fcbc2a2c98db130966a1f07ceb2fc564c39d556e9a228d6d136c',
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
  case RESET_STATE_GAME:
    return payload;
  default:
    return state;
  }
};

export default game;
