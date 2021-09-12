import GAME_ACTIONS from '../actions/gameActions';

const INITIAL_STATE = {
  guessed: false,
  score: 0,
  assertions: 0,
  totalQuestions: 5,
  time: 3000,
  currentQuestion: 0,
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GAME_ACTIONS.GUESS:
    return { ...state, guessed: true };
  case GAME_ACTIONS.NEXT_QUESTION:
    return {
      ...state,
      guessed: false,
      currentQuestion: state.currentQuestion + 1,
    };
  case GAME_ACTIONS.INCREASE_SCORE:
    return { ...state, score: state.score + action.payload };
  case GAME_ACTIONS.INCREASE_ASSERTIONS:
    return { ...state, assertions: state.assertions + 1 };
  case GAME_ACTIONS.SET_TIME:
    return { ...state, time: action.payload };
  case GAME_ACTIONS.RESET_GAME:
    return INITIAL_STATE;
  default:
    return state;
  }
};

export default gameReducer;
