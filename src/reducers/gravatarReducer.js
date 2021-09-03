import { FETCH_GRAVATAR } from '../actions';

const INITIAL_STATE = {
  gravatarURL: '',
};

const gravatar = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_GRAVATAR:
    return { ...state, gravatarURL: action.payload };
  default:
    return state;
  }
};

export default gravatar;
