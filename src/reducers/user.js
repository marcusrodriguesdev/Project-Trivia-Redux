import { SET_PLAYER_INFO, SET_PLAYER_TOKEN } from '../actions';

const INITIAL_STATE = {
  player: {},
  token: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_PLAYER_INFO:
    return { ...state, player: action.payload };
  case SET_PLAYER_TOKEN:
    return { ...state, token: action.payload };
  default:
    return state;
  }
};

export default userReducer;
