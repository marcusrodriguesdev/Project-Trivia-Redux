import { ADD_TRIVIA_INDEX } from '../actions';

const INITIAL_STATE = {
  index: 0,
};

const triviaIndexReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_TRIVIA_INDEX:
    return { ...state, index: action.payload };
  default:
    return state;
  }
};

export default triviaIndexReducer;
