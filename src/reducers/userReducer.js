import { SET_USER } from '../actions/index';

const INITIAL_STATE = {
  email: '',
  name: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USER:
    return {
      ...state, ...action.payload,
    };
  default:
    return state;
  }
};
export default userReducer;
