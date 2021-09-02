const LOGIN = 'LOGIN';
export const INITIAL_STATE = {
  name: '',
  email: '',
  profile: '',
};

function loginReducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
  case LOGIN:
    return {
      ...state,
      name: payload.name,
      email: payload.email,
      profile: payload.profile,
    };

  default:
    return state;
  }
}

export default loginReducer;
