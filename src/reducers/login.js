import { SAVE_NAME, SAVE_EMAIL } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case (SAVE_NAME):
    return ({
      ...state,
      name: action.payload,
    });
  case (SAVE_EMAIL):
    return ({
      ...state,
      email: action.payload,
    });
  default:
    return state;
  }
};

export default loginReducer;
