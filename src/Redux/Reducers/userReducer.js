import { ALL_ACTIONS } from '../Action';

const INITIAL_STATE = {
  name: '',
  email: '',
  token: '',
};

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ALL_ACTIONS.SAVE_TOKEN:
    return {
      ...state,
      token: payload,
    };
  case ALL_ACTIONS.ADD_NAME:
    return {
      ...state,
      name: payload,
    };
  default:
    return state;
  }
};

export default userReducer;
