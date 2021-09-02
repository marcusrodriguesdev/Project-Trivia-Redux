import { ADD_TRIVIA } from '../actions';

const INITIAL_STATE = {};

const triviaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_TRIVIA:
    return { ...state, results: action.payload };
  default:
    return state;
  }
};

export default triviaReducer;