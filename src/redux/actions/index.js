const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
const TOKEN_FAIL = 'TOKEN_FAIL';
const QUESTION_SUCCESS = 'QUESTION_SUCCESS';
const QUESTION_FAIL = 'QUESTION_FAIL';
const SET_NAME = 'SET_NAME';
const SET_EMAIL = 'SET_EMAIL';
const CATEGORY_SUCCESS = 'CATEGORY_SUCCESS';
const CATEGORY_FAIL = 'CATEGORY_FAIL';
const UPDATE_SELECTION = 'UPDATE_SELECTION';

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
  if (category !== /all/i) {
    baseURL += `&category=${category}`;
  }
  if (difficulty !== /mixed/i) {
    baseURL += `&difficulty=${difficulty}`;
  }
  if (type !== /both/i) {
    baseURL += `&type=${type}`;
  }
  baseURL += `&token=${token}`;
  return baseURL;
};

export const fetchQuestionThunk = (config, token) => async (dispatch) => {
  const defaultConfig = {
    category: 'all',
    difficulty: 'easy',
    type: 'both',
  };
  if (config === defaultConfig) {
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const data = await response.json();
      return dispatch(fetchQuestionSuccess(data.results));
    } catch (error) {
      return dispatch(fetchQuestionFail(error));
    }
  } else {
    try {
      const fetchURL = handleURL(config, token);
      console.log(fetchURL);
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
