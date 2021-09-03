import { SET_TOKEN } from '../actions';

const INITIAL_STATE = {
  token: {},
};

const game = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
  case SET_TOKEN:
    return {
      ...state,
      token: { ...payload },
    };
  default:
    return state;
  }
};

export default game;
