import ACTIONS from '../Actions/index';

const INITIAL_STATE = {
  token: '',
  points: 0,
};

function triviaReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ACTIONS.SET_TRIVIA:
    return {
      ...state,
      points: state.points + action.payload,
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
