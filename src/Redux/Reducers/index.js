import { combineReducers } from 'redux';
import userReducer from './userReducer';
import triviaReducer from './triviaReducer';
import timerReducer from './timerReducer';

const rootReducer = combineReducers({
  user: userReducer,
  trivia: triviaReducer,
  timer: timerReducer,
});

export default rootReducer;
