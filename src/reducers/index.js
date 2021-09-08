import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import triviaReducer from './triviaReducer';
import gravatar from './gravatarReducer';
import triviaIndexReducer from './triviaIndexReducer';

const rootReducer = combineReducers({
  loginReducer, triviaReducer, gravatar, triviaIndexReducer });

export default rootReducer;
