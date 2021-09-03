import { SET_QUESTION } from '../actions';

const INNITIAL_STATE = {
  questions: [],
};

function questionReducer(state = INNITIAL_STATE, action) {
  switch (action.type) {
  case SET_QUESTION:
    return {
      ...state,
      questions: action.payload,
    };
  default:
    return state;
  }
}

export default questionReducer;
