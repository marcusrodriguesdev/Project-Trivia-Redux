import { SAVE_NAME, UPDATE_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  score: 0,
};

function player(state = INITIAL_STATE, action) {
  const stateKey = JSON.parse(localStorage.getItem('state'));
  switch (action.type) {
  case SAVE_NAME:
    return {
      ...state,
      name: action.player.name,
    };
  case UPDATE_SCORE:
    stateKey.player.score = state.score + action.points;
    localStorage.setItem('state', JSON.stringify(stateKey));
    return {
      ...state,
      score: state.score + action.points,
    };
  default:
    return state;
  }
}

export default player;
