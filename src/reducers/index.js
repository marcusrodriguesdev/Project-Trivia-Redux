import { combineReducers } from 'redux';
import user from './user';
import player from './player';

const reducer = combineReducers({ user, player });

export default reducer;
