import ACTIONS from '../Actions/index';

const INITIAL_STATE = {
  token: '',
};

function triviaReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ACTIONS.SET_TRIVIA:
    return {
      ...state,
      ...action.payload,
    };
  case ACTIONS.GET_TOKEN:
    return {
      ...state,
    };
  case ACTIONS.GET_TOKEN_SUCCESS:
    return {
      ...state,
      token: action.payload,
    };
  default:
    return state;
  }
}

export default triviaReducer;
