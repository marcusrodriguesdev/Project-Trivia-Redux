import { SET_TOKEN, SET_TIMER, RESET_TIMER } from '../actions';

const INITIAL_STATE = {
  token: {
    response_code: 0,
    response_message: 'Token Generated Successfully!',
    token: '6f659292fd2215338e3ea98143bc5901be0e3721e60f82fd2fac8f7e76808b81',
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
