import { ALL_ACTIONS } from '../Action';

const INITIAL_STATE = {
  isClicked: false,
  result: [],
  loading: true,
  isVisible: false,
  score: 0,
};

const triviaReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ALL_ACTIONS.RESQUEST_QUESTION_SUCESS:
    return {
      ...state,
      result: payload,
    };
  case ALL_ACTIONS.SET_IS_CLICKED:
    return {
      ...state,
      isClicked: !state.isClicked,
    };
  case ALL_ACTIONS.LOADING:
    return {
      ...state,
      loading: payload,
    };
  case ALL_ACTIONS.CHANGE_VISIBILITY:
    return {
      ...state,
      isVisible: !state.isVisible,
    };
  case ALL_ACTIONS.UPDATE_SCORE:
    return {
      ...state,
      score: state.score + payload,
    };
  default:
    return state;
  }
};

export default triviaReducer;
