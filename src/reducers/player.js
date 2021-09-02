const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'algum':
    return {
      name: '',
      assertions: '',
      score: '',
      gravatarEmail: '',
    };
  default:
    return state;
  }
};

export default player;
