import { combineReducers } from 'redux';
import user from './user';
import player from './player';
import game from './game';

const reducer = combineReducers({ user, game, player });

export default reducer;
