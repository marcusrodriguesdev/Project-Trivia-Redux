import { SET_PLAYER, ADD_SCORE } from '../actions';

const INITIAL_STATE = {
  playerInfo: {
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
      playerInfo: {
        name: action.payload.name,
        email: action.payload.email,
        avatar: action.payload.avatar,
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
