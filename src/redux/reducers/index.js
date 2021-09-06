import { combineReducers } from 'redux';
import authReducer from './authReducer';
import questionsReducer from './questionsReducer';
import gameReducer from './gameReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  game: gameReducer,
  questions: questionsReducer,
});

export default rootReducer;
