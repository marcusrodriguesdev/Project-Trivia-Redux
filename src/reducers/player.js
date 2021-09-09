import { SET_PLAYER, SET_TOKEN, SET_SCORE_AND_ASSERTIONS } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  token: '',
};

function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_PLAYER:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
      assertions: 0,
      score: 0,
    };
  case SET_TOKEN:
    return {
      ...state,
      token: action.payload,
    };
  case SET_SCORE_AND_ASSERTIONS:
    return {
      ...state,
      assertions: action.payload.assertions,
      score: action.payload.score,
    };
  default:
    return state;
  }
}

export default playerReducer;
