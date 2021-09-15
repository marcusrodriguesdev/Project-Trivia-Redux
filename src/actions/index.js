export const ACTIONS = {
  SET_EMAIL: 'SET_EMAIL',
  GET_TOKEN: 'GET_TOKEN',
  SET_SCORE: 'SET_SCORE',
  SET_IMG_GRAVATAR: 'SET_IMG_GRAVATAR',
  SET_IMG_GRAVATAR_ERROR: 'SET_IMG_GRAVATAR_ERROR',
  SET_SETTINGS: 'SET_SETTINGS',
  SET_RANKING: 'SET_RANKING',
  GET_LOCALSTORAGE_RANKING: 'GET_LOCALSTORAGE_RANKING',
};

export const setEmail = (payload) => ({ type: ACTIONS.SET_EMAIL, payload });

export const getToken = (token) => ({ type: ACTIONS.GET_TOKEN, payload: token });

export const setScore = (score) => ({ type: ACTIONS.SET_SCORE, payload: score });

export const setSettings = (payload) => ({ type: ACTIONS.SET_SETTINGS, payload });

export const setRanking = (payload) => ({ type: ACTIONS.SET_RANKING, payload });

const getLocalStorageRanking = (payload) => (
  { type: ACTIONS.GET_LOCALSTORAGE_RANKING, payload });

export function getTokenApi() {
  return async (dispatch) => {
    const api = 'https://opentdb.com/api_token.php?command=request';
    const request = await fetch(api);
    const data = await request.json();
    const { token } = data;
    localStorage.setItem('token', token);
    dispatch(getToken(token));
  };
}

export function setLocalStorageThunk() {
  return async (_, getState) => {
    localStorage.setItem('state', JSON.stringify(getState()));
  };
}

export function sendToRank() {
  const rankItem = JSON.parse(localStorage.getItem('ranking'));
  return async (dispatch) => (dispatch(getLocalStorageRanking(rankItem)));
}

export function localStorageRanking() {
  return async (_, getState) => {
    localStorage.setItem('ranking', JSON.stringify(getState().ranking));
  };
}

export const actionSuccessAPI = (payload) => (
  { type: ACTIONS.SET_IMG_GRAVATAR, payload });

export const actionErrorAPI = (payload) => (
  { type: ACTIONS.SET_IMG_GRAVATAR_ERROR, payload });

export const actionFunctionThunk = (hash) => async (dispatch) => {
  try {
    const getGravatarAPI = await fetch(`https://www.gravatar.com/avatar/${hash}`);
    dispatch(actionSuccessAPI(getGravatarAPI.url));
  } catch (error) {
    dispatch(actionErrorAPI(error));
  }
};

const createEndPointSettings = (category, difficulty, type) => {
  let endPoint = '';
  if (category) endPoint += `&category=${category}`;
  if (difficulty) endPoint += `&difficulty=${difficulty}`;
  if (type) endPoint += `&type=${type}`;
  return endPoint;
};

export const fetchQuestionsThunk = () => async (_, getState) => {
  const BASE_URL = 'https://opentdb.com/api.php?amount=5';
  const { settings: { category, difficulty, type } } = getState().questions;
  createEndPointSettings(category, difficulty, type);
  const endPoint = createEndPointSettings(category, difficulty, type);
  const response = await fetch(`${BASE_URL}${endPoint}`);
  const questions = await response.json();
  if (!questions.response_code) return questions.results;
  return questions.response_code;
};

export const getCategoriesListThunk = () => async () => {
  const response = await fetch('https://opentdb.com/api_category.php');
  const categories = await response.json();
  return categories.trivia_categories;
};
