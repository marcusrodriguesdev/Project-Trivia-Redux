const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
const TOKEN_FAIL = 'TOKEN_FAIL';
const QUESTION_SUCCESS = 'QUESTION_SUCCESS';
const QUESTION_FAIL = 'QUESTION_FAIL';
const SET_NAME = 'SET_NAME';
const SET_EMAIL = 'SET_EMAIL';
const CATEGORY_SUCCESS = 'CATEGORY_SUCCESS';
const CATEGORY_FAIL = 'CATEGORY_FAIL';
const UPDATE_SELECTION = 'UPDATE_SELECTION';
const defaultConfig = {
  category: 'All',
  difficulty: 'Mixed',
  type: 'Both',
};
const tokenExpiredCode = 3;

export const fetchTokenSuccess = (payload) => ({
  type: TOKEN_SUCCESS,
  payload,
});

export const fetchTokenFail = (payload) => ({
  type: TOKEN_FAIL,
  payload,
});

export const fetchQuestionSuccess = (payload) => ({
  type: QUESTION_SUCCESS,
  payload,
});

export const fetchQuestionFail = (payload) => ({
  type: QUESTION_FAIL,
  payload,
});

export const fetchCategorySuccess = (payload) => ({
  type: CATEGORY_SUCCESS,
  payload,
});

export const fetchCategoryFail = (payload) => ({
  type: CATEGORY_FAIL,
  payload,
});

export const fetchTokenThunk = () => async (dispatch) => {
  try {
    const fetchApi = await fetch('https://opentdb.com/api_token.php?command=request');
    const json = await fetchApi.json();
    const { token } = json;
    return dispatch(fetchTokenSuccess(token));
  } catch (error) {
    return dispatch(fetchTokenFail(error));
  }
};

const handleURL = (config, token) => {
  const { category, difficulty, type } = config;
  let baseURL = 'https://opentdb.com/api.php?amount=5';
  if (category !== 'All') {
    baseURL += `&category=${category}`;
  }
  if (difficulty !== 'Mixed') {
    const lowerCase = difficulty.toLowerCase();
    baseURL += `&difficulty=${lowerCase}`;
  }
  if (type === 'Multiple') {
    baseURL += '&type=multiple';
  } else if (type === 'True or False') {
    baseURL += '&type=boolean';
  }
  baseURL += `&token=${token}`;
  return baseURL;
};

// export const handleURLAlter = (config, token) => {
//   const { category, difficulty, type } = config;
//   const baseURL = 'https://opentdb.com/api.php?amount=5';
//   const URLToken = `&token=${token}`;
//   const options = {
//     category: {
//       All: '',
//       9: '&category=9',
//       10: '&category=10',
//       11: '&category=11',
//       12: '&category=12',
//       13: '&category=13',
//       14: '&category=14',
//       15: '&category=15',
//       16: '&category=16',
//       17: '&category=17',
//       18: '&category=18',
//       19: '&category=19',
//       20: '&category=20',
//       21: '&category=21',
//       22: '&category=22',
//       23: '&category=23',
//       24: '&category=24',
//       25: '&category=25',
//       26: '&category=26',
//       27: '&category=27',
//       28: '&category=28',
//       29: '&category=29',
//       30: '&category=30',
//       31: '&category=31',
//       32: '&category=32',
//     },
//     difficulty: {
//       Mixed: '',
//       easy: '&difficulty=easy',
//       medium: '&difficulty=medium',
//       hard: '&difficulty=hard',
//     },
//     type: {
//       Both: '',
//       Multiple: '&type=multiple',
//       'True or False': '&type=boolean',
//     },
//   };
//   let finalURL = baseURL + options.category[category] + options.difficulty[difficulty];
//   finalURL += options.type[type] + URLToken;
//   return finalURL;
// };

export const fetchQuestionThunk = (config, token) => async (dispatch) => {
  if (config === defaultConfig) {
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const data = await response.json();
      if (data.response_code === tokenExpiredCode) {
        data.results = [{
          category: 'Token Expirado, favor direcionar para a Home e recarregar a página!',
          correct_answer: '',
          difficulty: '',
          incorrect_answers: [],
          question: '',
          type: '',
        }];
      }
      return dispatch(fetchQuestionSuccess(data.results));
    } catch (error) {
      return dispatch(fetchQuestionFail(error));
    }
  } else {
    try {
      const fetchURL = handleURL(config, token);
      const response = await fetch(fetchURL);
      const data = await response.json();
      return dispatch(fetchQuestionSuccess(data.results));
    } catch (error) {
      return dispatch(fetchQuestionFail(error));
    }
  }
};

export const setNameAction = (payload) => ({
  type: SET_NAME,
  payload,
});

export const setEmailAction = (payload) => ({
  type: SET_EMAIL,
  payload,
});

export const categoriesFetchThunk = () => async (dispatch) => {
  try {
    const response = await fetch('https://opentdb.com/api_category.php');
    const data = await response.json();
    return dispatch(fetchCategorySuccess(data.trivia_categories));
  } catch (error) {
    return dispatch(fetchCategoryFail(error));
  }
};

export const updateSelectionAction = (payload) => ({
  type: UPDATE_SELECTION,
  payload,
});
