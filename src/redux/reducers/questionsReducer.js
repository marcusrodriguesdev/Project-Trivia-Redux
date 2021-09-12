import QUESTION_ACTIONS from '../actions/questionActions';
import GAME_ACTIONS from '../actions/gameActions';

const INITIAL_STATE = {
  questionsArray: [],
  categoryList: [],
  isFetching: false,
  error: '',
};

const questionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case QUESTION_ACTIONS.REQUEST_API:
    return { ...state, isFetching: true };
  case QUESTION_ACTIONS.FAILED_REQUEST:
    return { ...state, isFetching: false, error: action.payload };
  case QUESTION_ACTIONS.SET_QUESTIONS:
    return {
      ...state,
      isFetching: false,
      error: '',
      questionsArray: action.payload,
    };
  case GAME_ACTIONS.RESET_GAME:
    return INITIAL_STATE;
  case QUESTION_ACTIONS.GET_CATEGORIES:
    return {
      ...state,
      isFetching: false,
      error: '',
      categoryList: action.payload,
    };
  default:
    return state;
  }
};

export default questionsReducer;
