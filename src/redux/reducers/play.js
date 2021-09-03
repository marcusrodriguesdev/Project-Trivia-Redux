import {
  GET_TOKEN,
  SET_NAME,
  SET_EMAIL,
} from '../actions';

const INNITIAL_STATE = {
  token: '',
  name: '',
  email: '',
};

function playReducer(state = INNITIAL_STATE, action) {
  switch (action.type) {
  case GET_TOKEN:
    return {
      ...state,
      token: action.payload,
    };
  case SET_NAME:
    return {
      ...state,
      name: action.payload,
    };
  case SET_EMAIL:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
}

export default playReducer;
