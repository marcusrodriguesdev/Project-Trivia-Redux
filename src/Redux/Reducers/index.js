// Arquivo onde serão importados todos os Reducers colocadas e combinados com o CombineReducers
// Os outros reducers ficarão em arquivos diferentes com o mesmo nome do reducer

import { combineReducers } from 'redux';
import playerReducer from './player';

const rootReducer = combineReducers(playerReducer);

export default rootReducer;
