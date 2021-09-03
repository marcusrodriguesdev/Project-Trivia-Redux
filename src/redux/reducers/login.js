import { LOGIN } from '../actions';

const INITIAL_STATE = {
  user: {
    nome: '',
    email: '',
    score: 0,
  },
};

const reducerLogin = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return { ...state, user: action.payload };
  default:
    return state;
  }
};

export default reducerLogin;
