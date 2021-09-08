import { SET_CORRECTS } from '../actions';

const INNITIAL_STATE = {
  answersCorrects: 0,
};

function setCorrects(state = INNITIAL_STATE, action) {
  switch (action.type) {
  case SET_CORRECTS:
    return {
      ...state,
      answersCorrects: action.payload,
    };
  default:
    return state;
  }
}

export default setCorrects;
