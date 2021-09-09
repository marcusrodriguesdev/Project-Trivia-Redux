import { combineReducers } from 'redux';
import userReducer from './user';
import timerReducer from './timer';
import scoreReducer from './scores';

const rootReducer = combineReducers({
  scoreReducer,
  timerReducer,
  userReducer,
});

export default rootReducer;
