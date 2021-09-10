export const actions = {
  LOGGED_INFO: 'LOGGED_INFO',
  LOADING: 'LOADING',
  GET_TOKEN: 'GET_TOKEN',
  GET_QUESTIONS: 'GET_QUESTIONS',
  SET_SCORE: 'SET_SCORE',
  SET_ASSERTIONS: 'SET_ASSERTIONS',
  SET_SETTINGS: 'SET_SETTINGS',
};

export const logged = (name, email) => ({ type: actions.LOGGED_INFO, name, email });
export const getApi = (payload) => ({ type: actions.GET_TOKEN, payload });
export const getQuestions = (payload) => ({ type: actions.GET_QUESTIONS, payload });
export const loading = () => ({ type: actions.LOADING });
export const setScore = (score) => ({ type: actions.SET_SCORE, score });
export const setAssertions = (assert) => ({ type: actions.SET_ASSERTIONS, assert });
export const setSettings = (config) => ({ type: actions.SET_SETTINGS, config });

export function fetchQuestions(settings) {
  const { difficulty, category, quantity } = settings;
  const questionsAPI = `https://opentdb.com/api.php?amount=${quantity}&category=${category}&difficulty=${difficulty}`;

  return async (dispatch) => {
    fetch(questionsAPI)
      .then((response) => response.json())
      .then((questions) => {
        dispatch(getQuestions(questions));
        dispatch(loading());
      });
  };
}
