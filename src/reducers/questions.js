import { ACTIONS } from '../actions/index';

const INITIAL_STATE = {
  settings: {
    category: '',
    difficulty: '',
    type: '',
  },
};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTIONS.SET_SETTINGS:
    return { ...state, settings: { ...action.payload } };
  default:
    return state;
  }
};

export default questions;
