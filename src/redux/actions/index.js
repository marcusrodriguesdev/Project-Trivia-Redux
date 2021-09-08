const questionsAPI = 'https://opentdb.com/api.php?amount=5';
export const actions = {
  LOGGED_INFO: 'LOGGED_INFO',
  LOADING: 'LOADING',
  GET_TOKEN: 'GET_TOKEN',
  GET_QUESTIONS: 'GET_QUESTIONS',
};

export const logged = (payload) => ({ type: actions.LOGGED_INFO, payload });
export const getApi = (payload) => ({ type: actions.GET_TOKEN, payload });
export const getQuestions = (payload) => ({ type: actions.GET_QUESTIONS, payload });
export const loading = () => ({ type: actions.LOADING });

export function getToken() {
  return async (dispatch) => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const result = await response.json();
    localStorage.setItem('token', result.token);
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
