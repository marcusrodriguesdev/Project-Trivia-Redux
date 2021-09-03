import ACTIONS from '../actions';

const INICIAL_STATE = {
  token: '',
};

export default function reducer(state = INICIAL_STATE, action) {
  switch (action.type) {
  case ACTIONS.GET_TOKEN:
    return { ...state, token: action.token };
  default:
    return state;
  }
}
