// Esse reducer será responsável por tratar as informações da pessoa usuária
import { GET_QUESTIONS, INDEX } from '../actions/index';

const INITIAL_STATE = {
  questions: {},
  index: 0,
};

function gamePage(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_QUESTIONS:
    return { ...state, questions: action.payload };
  case INDEX:
    return { ...state, index: state.index + 1 };
  default:
    return state;
  }
}

export default gamePage;
