const INITIAL_STATE = {
  user: '',
  email: '',
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ACTION_LOGIN':
    return {
      ...state,
      user: action.payload.user,
      email: action.payload.email,
    };
  default:
    return state;
  }
};

export default login;
