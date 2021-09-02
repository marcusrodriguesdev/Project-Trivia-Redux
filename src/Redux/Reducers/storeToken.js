const STORE_TOKEN = 'STORE_TOKEN';

const DEFAULT_STATE = {
  token: '',
};

const userInfo = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case STORE_TOKEN:
    return {
      ...state,
      token: action.payload.token,
    };
  default:
    return state;
  }
};

export default userInfo;
