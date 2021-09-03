import { GET_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  questionsApi: [],
  questionIndex: 0,
  isFetching: true,
};

const questionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case (GET_QUESTIONS):
    return ({ ...state,
      questionsApi: [...action.payload.questions],
      isFetching: false });
  default:
    return state;
  }
};

export default questionsReducer;
