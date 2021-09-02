const STORE_USER_INFO = 'STORE_USER_INFO';

const DEFAULT_STATE = {
  name: '',
  email: '',
  token: '',
};

const userInfo = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case STORE_USER_INFO:
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
};

export default userInfo;
