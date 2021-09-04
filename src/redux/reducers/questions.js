import { REQUEST_QUESTIONS_SUCCESS, REQUEST_QUESTIONS_ERROR } from '../actions';

const INITIAL_STATE = {
  questions: [],
  error: null,
};

const questionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_QUESTIONS_SUCCESS:
    return { ...state, questions: action.payload };
  case REQUEST_QUESTIONS_ERROR:
    return { ...state, error: action.payload };
  default:
    return state;
  }
};

export default questionsReducer;
