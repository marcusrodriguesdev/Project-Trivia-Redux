// import { PLAY } from '../Action';

const INITIAL_STATE = { player: {
  // eslint-disable-next-line no-restricted-globals
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
} };

function playerReducer(state = INITIAL_STATE, action) {
  switch (action) {
  default:
    return state;
  }
}

export default playerReducer;
