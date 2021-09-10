const INICIAL_STATE = {
  timer: 30,
  stop: false,
};

export default function timerReducer(state = INICIAL_STATE, action) {
  switch (action.type) {
  case 'TIMER':
    return { ...state, timer: action.timer };
  case 'STOP':
    return { ...state, stop: !state.stop };
  default:
    return state;
  }
}
