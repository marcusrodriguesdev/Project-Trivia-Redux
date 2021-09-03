import { SET_TOKEN } from '../actions';

const INITIAL_STATE = {
  token: {
    response_code: 0,
    response_message: 'Token Generated Successfully!',
    token: '556e20b9ad83ae6dc89a47107974a83b842a3103f1ce5459b6dfe552dea3d9f6',
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
  default:
    return state;
  }
};

export default game;
