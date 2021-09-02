import { ALL_ACTIONS } from '../Action';

const INITIAL_STATE = {
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
  default:
    return state;
  }
};

export default userReducer;
