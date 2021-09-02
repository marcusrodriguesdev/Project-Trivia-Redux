import { combineReducers } from 'redux';
import trivia from './trivia';
import user from './user';

const reducers = combineReducers({
  trivia,
  user,
});

export default reducers;
