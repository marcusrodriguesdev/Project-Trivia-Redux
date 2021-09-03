import { GET_QUESTIONS, FETCH_API_TRIVIA } from '../actions';

const INITIAL_STATE = {
  questions: [],
  isFetching: false,
};

const questionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case (GET_QUESTIONS):
    return ({ ...state, questions: [...action.payload.questions], isFetching: false });
  case (FETCH_API_TRIVIA):
    return ({ ...state, isFetching: action.payload.isFetching });
  default:
    return state;
  }
};

export default questionsReducer;
