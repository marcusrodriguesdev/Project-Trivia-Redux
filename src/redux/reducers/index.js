// import ACTIONS from '../actions';
import { ACTIONS } from '../actions';

const INICIAL_STATE = {
  token: '',
  name: '',
  email: '',
  image: '',
  hits: 0,
  score: 0,
  endpoint: 'https://opentdb.com/api.php?amount=5&token=',
  timer: 30,
};

export default function reducer(state = INICIAL_STATE, action) {
  switch (action.type) {
  case ACTIONS.GET_TOKEN:
    return { ...state, token: action.token };
  case 'NAME_EMAIL':
    return { ...state, name: action.name, email: action.email };
  case 'IMAGE':
    return { ...state, image: action.image };
  case ACTIONS.HITS:
    return { ...state, hits: action.hits };
  case ACTIONS.SCORE:
    return { ...state, score: action.score };
  case 'TIMER':
    return { ...state, timer: action.timer };
  default:
    return state;
  }
}
