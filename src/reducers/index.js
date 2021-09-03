import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import triviaReducer from './triviaReducer';

const rootReducer = combineReducers({ loginReducer, triviaReducer });

export default rootReducer;
