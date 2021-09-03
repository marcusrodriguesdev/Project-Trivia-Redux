import { SET_PLAYER } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  avatar: '',
};

export default function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_PLAYER:
    return {
      payload,
    };
  default:
    return state;
  }
}
