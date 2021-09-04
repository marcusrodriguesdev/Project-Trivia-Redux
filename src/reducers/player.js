import { ACTIONS } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTIONS.SET_EMAIL:
    return { ...state, gravatarEmail: action.payload.email, name: action.payload.name };
  default:
    return state;
  }
};

export default player;
