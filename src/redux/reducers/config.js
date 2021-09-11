const INITIAL_STATE = {
  categories: [],
  selection: {
    category: 'All',
    difficulty: 'Mixed',
    type: 'Both',
  },
};

function configReducer(state = INITIAL_STATE, { type, payload }) {
  const casesObj = {
    CATEGORY_SUCCESS: ({ ...state, categories: payload }),
    CATEGORY_FAIL: ({ ...state, categories: payload }),
    UPDATE_SELECTION: ({ ...state, selection: payload }),
  };
  if (!casesObj[type]) {
    return state;
  }
  return casesObj[type];
  // switch (type) {
  // case CATEGORY_SUCCESS:
  //   return ({ ...state, categories: payload });
  // case CATEGORY_FAIL:
  //   return ({ ...state, categories: payload });
  // case UPDATE_SELECTION:
  //   return ({ ...state, selection: payload });
  // default:
  //   return state;
  // }
}

export default configReducer;
