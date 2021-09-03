import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import triviaReducer from './triviaReducer';
import gravatar from './gravatarReducer';

const rootReducer = combineReducers({ loginReducer, triviaReducer, gravatar });

export default rootReducer;
