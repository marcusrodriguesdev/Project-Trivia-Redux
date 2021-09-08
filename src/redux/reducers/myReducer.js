const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
const TOKEN_FAIL = 'TOKEN_FAIL';
const QUESTION_SUCCESS = 'QUESTION_SUCCESS';
const QUESTION_FAIL = 'QUESTION_FAIL';

const INITIAL_STATE = {
  token: '',
  results: [],
};

function playerReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case TOKEN_SUCCESS:
    return ({ ...state, token: payload });
  case TOKEN_FAIL:
    return ({ ...state, token: payload });
  case QUESTION_SUCCESS:
    return ({ ...state, results: payload });
  case QUESTION_FAIL:
    return ({ ...state, results: payload });
  default:
    return state;
  }
}

export default playerReducer;
