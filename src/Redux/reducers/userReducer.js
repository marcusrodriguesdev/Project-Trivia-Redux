import { USER_LOGIN } from '../action';

const INITIAL_STATE = {
  user: {
    email: '',
    name: '',
  },
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return {
      ...state,
      user: {
        email: action.payload.email,
        name: action.payload.name,
      },
    };
  default:
    return state;
  }
};

export default userReducer;
