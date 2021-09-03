import { ACTIONS } from '../actions';

const INITIAL_STATE = '';

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTIONS.GET_TOKEN:
    return action.payload;
  default:
    return state;
  }
};

export default token;
