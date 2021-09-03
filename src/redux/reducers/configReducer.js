import { SET_CONFIG } from '../actions';

const INITIAL_STATE = {
  config: [],
};

export default function configReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_CONFIG:
    return {
      payload,
    };
  default:
    return state;
  }
}
