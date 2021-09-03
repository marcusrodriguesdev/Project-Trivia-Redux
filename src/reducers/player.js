import { SAVE_NAME } from '../actions';

const INITIAL_STATE = {
  name: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_NAME:
    return {
      ...state,
      name: action.player.name,
    };
  default:
    return state;
  }
}

export default player;
