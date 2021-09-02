import ACTIONS from '../Actions/index';

const INITIAL_STATE = {
  name: '',
  email: '',
};

function triviaReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ACTIONS.SET_TRIVIA:
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
}

export default triviaReducer;
