import { combineReducers } from 'redux';
import player from './player';
import questions from './questions';
import token from './token';
import ranking from './ranking';

const rootReducers = combineReducers({
  player,
  questions,
  token,
  ranking,
});

export default rootReducers;
