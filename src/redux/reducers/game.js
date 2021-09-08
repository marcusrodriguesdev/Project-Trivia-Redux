import { SET_TOKEN, SET_TIMER } from '../actions';

const INITIAL_STATE = {
  token: {},
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
