import { ADD_TOKEN } from '../actions/index';

const initialState = {
  player: {
    name: '',
    assertions: '',
    score: '',
    gravatarEmail: '',
  },
  ranking: [
    { name: '',
      score: 0,
      picture: '',
    },
  ],
  token: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case ADD_TOKEN:
    return { ...state, token: action.payload };
  default:
    return state;
  }
};

export default user;
