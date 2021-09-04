import { ALL_ACTIONS } from '../Action';

const INITIAL_STATE = {
  isClicked: false,
  timer: 30,
};

const triviaReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ALL_ACTIONS.SET_IS_CLICKED:
    return {
      ...state,
      isClicked: payload,
    };
  case ALL_ACTIONS.UPDATE_TIMER:
    return {
      ...state,
      timer: payload,
    };
  default:
    return state;
  }
};

export default triviaReducer;
