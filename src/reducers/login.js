const INITIAL_STATE = {
  name: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'email':
    return {
      ...state,
      email: action.state.email,
    };
  default:
    return state;
  }
}

export default user;
