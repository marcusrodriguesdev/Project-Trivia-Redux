import { ALL_ACTIONS } from '../Action';

const INITIAL_STATE = {
  isClicked: false,
};

const triviaReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ALL_ACTIONS.SET_IS_CLICKED:
    return {
      ...state,
      isClicked: payload,
    };
  default:
    return state;
  }
};

export default triviaReducer;
