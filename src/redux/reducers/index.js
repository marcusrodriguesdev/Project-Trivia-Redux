// import ACTIONS from '../actions';
import { ACTIONS } from '../actions';

const INICIAL_STATE = {
  token: '',
  name: '',
  email: '',
};

export default function reducer(state = INICIAL_STATE, action) {
  switch (action.type) {
  case ACTIONS.GET_TOKEN:
    return { ...state, token: action.token };
  case 'NAME_EMAIL':
    return { ...state, name: action.name, email: action.email };
  default:
    return state;
  }
}
