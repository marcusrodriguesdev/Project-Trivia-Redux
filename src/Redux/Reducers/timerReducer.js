import { ALL_ACTIONS } from '../Action';

const INITIAL_STATE = {
  seconds: 30,
  statusCronometer: 'on',
};

const timerReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ALL_ACTIONS.TOGGLE_CRONOMETER:
    return {
      ...state,
      statusCronometer: payload,
    };
  case ALL_ACTIONS.GET_SECONDS:
    return {
      ...state,
      seconds: payload,
    };
  default:
    return state;
  }
};

export default timerReducer;
