import { GET_TOKEN } from '../actions';

const INNITIAL_STATE = {
  token: '',
};

function playReducer(state = INNITIAL_STATE, action) {
  switch (action.type) {
  case GET_TOKEN:
    return {
      ...state,
      token: action.payload,
    };
  default:
    return state;
  }
}

export default playReducer;
