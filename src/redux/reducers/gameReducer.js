import GAME_ACTIONS from '../actions/gameActions';

const INITIAL_STATE = {
  guessed: false,
  questions: [],
  questionIndex: 0,
  isFetching: false,
  error: '',
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GAME_ACTIONS.GUESS:
    return { ...state, guessed: true };
  case GAME_ACTIONS.NEXT_QUESTION:
    return {
      ...state,
      guessed: false,
      questionIndex: state.questionIndex + 1,
    };
  case GAME_ACTIONS.REQUEST_API:
    return { ...state, isFetching: true };
  case GAME_ACTIONS.FAILED_REQUEST:
    return { ...state, isFetching: false, error: action.payload };
  case GAME_ACTIONS.SET_QUESTIONS:
    return { ...state, isFetching: false, questions: action.payload };
  default:
    return state;
  }
};

export default gameReducer;
