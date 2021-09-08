import { actions } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actions.LOGGED_INFO:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
    };
  case actions.SET_SCORE:
    return { ...state, score: action.score };
  case actions.SET_ASSERTIONS:
    return { ...state, assertions: action.assert };
  default:
    return state;
  }
}

export default player;
