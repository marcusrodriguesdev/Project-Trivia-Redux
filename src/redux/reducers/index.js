import { combineReducers } from 'redux';
import token from './token';
import reducerLogin from './login';
import questionsReducer from './questions';

const rootReducer = combineReducers({ token, reducerLogin, questionsReducer });

export default rootReducer;
