const INITIAL_STATE = {
  email: '',
  name: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'CHANGE_EMAIL':
    return {
      ...state, email: action.payload,
    };
  case 'CHANGE_NAME':
    return {
      ...state, name: action.payload,
    };
  default:
    return state;
  }
};
export default userReducer;
