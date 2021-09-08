import { SET_TOKEN, SET_TIMER } from '../actions';

const INITIAL_STATE = {
  token: {
    response_code: 0,
    response_message: 'Token Generated Successfully!',
    token: 'ae8d3d5e98fd9d7d30044b6fcfdb3d88c7dc766de9bf7443b33db579edfbb1b7',
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
