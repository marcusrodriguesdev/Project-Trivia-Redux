import { SET_TOKEN } from '../actions';

const INITIAL_STATE = {
  token: {
    response_code: 0,
    response_message: 'Token Generated Successfully!',
    token: '892007e0b0d5109a56731517c35d5dba0b8ac8d823540a06baab8a3967c93476',
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
