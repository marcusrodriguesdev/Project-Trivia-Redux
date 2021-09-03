import { combineReducers } from 'redux';
import token from './token';
import reducerLogin from './login';

const rootReducer = combineReducers({ token, reducerLogin });

export default rootReducer;
