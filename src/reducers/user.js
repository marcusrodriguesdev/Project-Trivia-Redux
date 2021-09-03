import { SET_PLAYER_INFO, SET_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  player: {},
  questions: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_PLAYER_INFO:
    return { ...state, player: action.payload };
  case SET_QUESTIONS:
    return { ...state, questions: action.payload };
  default:
    return state;
  }
};

export default userReducer;
