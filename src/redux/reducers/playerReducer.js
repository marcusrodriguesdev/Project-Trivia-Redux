import { SET_PLAYER, ADD_SCORE } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    email: '',
    avatar: '',
  },
  score: 0,
};

export default function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_PLAYER:
    return { ...state,
      player: {
        name: action.payload.player.name,
        email: action.payload.player.email,
        avatar: action.payload.player.avatar,
      },
    };
  case ADD_SCORE:
    return { ...state,
      score: state.score + action.payload.score,
    };
  default:
    return state;
  }
}
