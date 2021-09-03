import GAME_ACTIONS from '../actions/gameActions';

const INITIAL_STATE = {
  guessed: false,
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GAME_ACTIONS.GUESS:
    return { guessed: true };
  case GAME_ACTIONS.NEXT_QUESTION:
    return { guessed: false };
  default:
    return state;
  }
};

export default gameReducer;
