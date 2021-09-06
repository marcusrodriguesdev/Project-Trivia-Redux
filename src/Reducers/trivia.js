import ACTIONS from '../Actions/index';

const INITIAL_STATE = {
  token: '',
  points: 0,
  showButton: false,
  assertions: 0,
};

function triviaReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ACTIONS.SET_TRIVIA:
    return {
      ...state,
      points: state.points + action.payload.points,
      showButton: action.payload.showButton,
      assertions: state.assertions + action.payload.assertionsAdd,
    };
  case ACTIONS.SHOW_BUTTON:
    return {
      ...state,
      showButton: action.payload.showButton,
    };
  case ACTIONS.CLEAR_STATE:
    return {
      ...state,
      points: 0,
      assertions: 0,
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
