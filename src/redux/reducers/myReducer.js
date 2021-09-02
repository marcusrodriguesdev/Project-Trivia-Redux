const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
const TOKEN_FAIL = 'TOKEN_FAIL';

const INITIAL_STATE = {
  token: '',
};

function userReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case TOKEN_SUCCESS:
    return ({ ...state, token: payload });
  case TOKEN_FAIL:
    return ({ ...state, token: payload });
  default:
    return state;
  }
}

export default userReducer;
