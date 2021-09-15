import { ACTIONS } from '../actions/index';

const INITIAL_STATE = [];

const ranking = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTIONS.SET_RANKING:
    return [...state, action.payload];
  default:
    return state;
  }
};

export default ranking;
