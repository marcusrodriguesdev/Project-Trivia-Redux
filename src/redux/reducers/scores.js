import { ACTIONS } from '../actions';

const INICIAL_STATE = {
  hits: 0,
  score: 0,
  total: 0,
};

export default function scoreReducer(state = INICIAL_STATE, action) {
  switch (action.type) {
  case ACTIONS.HITS:
    state.total += state.score;
    return { ...state, hits: state.hits + 1 };
  case ACTIONS.SCORE:
    if (action.score === 0) {
      return INICIAL_STATE;
    }
    return { ...state, score: action.score };
  default:
    return state;
  }
}
