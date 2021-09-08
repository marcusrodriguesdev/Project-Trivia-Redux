import { combineReducers } from 'redux';
import setCorrects from './setScore';
import playReducer from './play';
import questionReducer from './question';

const rootReducers = combineReducers({
  user: playReducer,
  results: questionReducer,
  Corrects: setCorrects,
});

export default rootReducers;
