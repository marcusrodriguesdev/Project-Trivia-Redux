import { ADD_TRIVIA, USER_TRY, SHOW_NEXT_BUTTON } from '../actions';

const INITIAL_STATE = {
  tryUser: false,
  renderButton: false,
};

const triviaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_TRIVIA:
    return { ...state, results: action.payload };
  case USER_TRY:
    return { ...state, tryUser: action.payload };
  case SHOW_NEXT_BUTTON:
    return { ...state, renderButton: true };
  default:
    return state;
  }
};

export default triviaReducer;
