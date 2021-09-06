import { SET_GAME_ROUND, SET_GAME_TOKEN } from '../actions';

const INITIAL_STATE = {
  token: '',
  rounds: [],
};

export default function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_GAME_ROUND:
    return { ...state,
      rounds: action.payload,
    };
  case SET_GAME_TOKEN:
    return { ...state,
      token: action.payload,
    };
  default:
    return state;
  }
}
