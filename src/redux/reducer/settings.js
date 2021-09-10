import { actions } from '../actions';

const INITIAL_STATE = {
  difficulty: '',
  category: '',
  quantity: 5,
};

function settings(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actions.SET_SETTINGS:
    return {
      difficulty: action.config.difficulty,
      category: action.config.category,
      quantity: action.config.quantity,
    };
  default:
    return state;
  }
}

export default settings;
