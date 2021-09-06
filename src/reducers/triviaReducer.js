import { ADD_TRIVIA, USER_TRY } from '../actions';

const INITIAL_STATE = {
  results: [],
  tryUser: false,
};

const triviaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_TRIVIA:
    return { ...state, results: action.payload };
  case USER_TRY:
    return { ...state, tryUser: true };
  default:
    return state;
  }
};

export default triviaReducer;
