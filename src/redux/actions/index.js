const questionsAPI = 'https://opentdb.com/api.php?amount=5';
export const LOGGED_INFO = 'LOGGED_INFO';
export const LOADING = 'LOADING';
export const GET_TOKEN = 'GET_TOKEN';
export const GET_QUESTIONS = 'GET_QUESTIONS';

export const logged = (payload) => ({ type: LOGGED_INFO, payload });
export const getApi = (payload) => ({ type: GET_TOKEN, payload });
export const getQuestions = (payload) => ({ type: GET_QUESTIONS, payload });
export const loading = () => ({ type: LOADING });

export function getToken() {
  return async (dispatch) => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const result = await response.json();
    dispatch(getApi(result));
  };
}

export function fetchQuestions() {
  return async (dispatch) => {
    fetch(questionsAPI)
      .then((response) => response.json())
      .then((questions) => {
        dispatch(getQuestions(questions));
        dispatch(loading());
      });
  };
}
