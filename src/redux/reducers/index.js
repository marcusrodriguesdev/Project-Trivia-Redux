// import ACTIONS from '../actions';
import { ACTIONS } from '../actions';

const INICIAL_STATE = {
  token: '',
  name: '',
  email: '',
  image: '',
  endpoint: 'https://opentdb.com/api.php?amount=5&token=',
};

export default function reducer(state = INICIAL_STATE, action) {
  switch (action.type) {
  case ACTIONS.GET_TOKEN:
    return { ...state, token: action.token };
  case 'NAME_EMAIL':
    return { ...state, name: action.name, email: action.email };
  case 'IMAGE':
    return { ...state, image: action.image };
  default:
    return state;
  }
}
