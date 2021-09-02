import { SET_EMAIL, SET_PLAYER_TOKEN } from '../actions';

const INITIAL_STATE = {
  email: '',
  nome: '',
  token: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_EMAIL:
    return { ...state, email: action.payload.email, nome: action.payload.nome };
  case SET_PLAYER_TOKEN:
    return { ...state, token: action.payload };
  default:
    return state;
  }
};

export default userReducer;
