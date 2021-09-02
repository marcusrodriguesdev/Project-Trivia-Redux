import ACTIONS from '../Actions/index';

const INITIAL_STATE = {
  name: '',
  email: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ACTIONS.SET_USER:
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
}

export default userReducer;
