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
  case ACTIONS.SET_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1,
    };

  case ACTIONS.SET_RANKING:
    return { ...INITIAL_STATE };

  case ACTIONS.SET_IMG_GRAVATAR:
    return { ...state, ...state.player, gravatarImagem: action.payload };
  default:
    return state;
  }
};

export default player;
