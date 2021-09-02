const INITIAL_STATE = { email: '', name: '' };

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  // case LOGGED_INFO:
  //   return { email: action.email, name: action.name };
  default:
    return state;
  }
}

export default user;
