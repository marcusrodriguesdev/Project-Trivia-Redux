import { SET_GAME_ROUND } from '../actions';

const INITIAL_STATE = {
  game: [],
};

export default function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_GAME_ROUND:
    return {
      payload,
    };
  default:
    return state;
  }
}
