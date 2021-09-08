// Esse reducer será responsável por tratar as informações da pessoa usuária
import { actions } from '../actions/index';

const INITIAL_STATE = {
  questions: {},
};

function gamePage(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actions.GET_QUESTIONS:
    return { ...state, questions: action.payload };
  default:
    return state;
  }
}

export default gamePage;
