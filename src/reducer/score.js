const SCORE = 'SCORE';

export const INITIAL_STATE = {
  name: '',
  email: '',
  profile: '',
  score: 0,
};

function scoreReducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
  case SCORE:
    return {
      ...state,
      name: payload.name,
      email: payload.email,
      profile: payload.profile,
      score: payload.score,
    };
  default:
    return state;
  }
}

export default scoreReducer;
