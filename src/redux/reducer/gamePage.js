// Esse reducer será responsável por tratar as informações da pessoa usuária
import { GET_QUESTIONS } from '../actions/index';

const INITIAL_STATE = {
  questions: {},
};

function gamePage(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_QUESTIONS:
    return { ...state, questions: action.payload };
  default:
    return state;
  }
}

export default gamePage;
