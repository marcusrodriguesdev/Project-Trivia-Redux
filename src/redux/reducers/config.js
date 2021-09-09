const CATEGORY_SUCCESS = 'CATEGORY_SUCCESS';
const CATEGORY_FAIL = 'CATEGORY_FAIL';
const UPDATE_SELECTION = 'UPDATE_SELECTION';

const INITIAL_STATE = {
  categories: [],
  selection: {
    category: 'all',
    difficulty: 'mixed',
    type: 'both',
  },
};

function configReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case CATEGORY_SUCCESS:
    return ({ ...state, categories: payload });
  case CATEGORY_FAIL:
    return ({ ...state, categories: payload });
  case UPDATE_SELECTION:
    return ({ ...state, selected: payload });
  default:
    return state;
  }
}

export default configReducer;
