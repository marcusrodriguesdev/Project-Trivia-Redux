import { PLAYER_INFO, PLAYER_POINTS } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case PLAYER_INFO:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case PLAYER_POINTS:
    return {
      ...state,
      score: action.payload.pontos,
      assertions: action.payload.assertion,
    };
  default:
    return state;
  }
}

export default playerReducer;
