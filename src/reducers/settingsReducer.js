import { SET_SETTINGS } from '../actions/index';

const INITIAL_STATE = {
  category: [],
  difficulty: [],
  type: [],
};

const settingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_SETTINGS:
    return {
      ...state, ...action.payload,
    };
  default:
    return state;
  }
};

export default settingsReducer;
