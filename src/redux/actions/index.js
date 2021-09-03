const questionsAPI = 'https://opentdb.com/api.php?amount=5';
// Depois adicionar no final da API o token:&token=${seu-token-aqui};

const actions = {
  LOGGED_INFO: 'LOGGED_INFO',
  GET_QUESTIONS: 'GET_QUESTIONS',
  LOADING: 'LOADING',
};

export const logged = (payload) => ({ type: actions.LOGGED_INFO, payload });

export const getQuestions = (payload) => ({ type: actions.GET_QUESTIONS, payload });

export const loading = () => ({ type: actions.LOADING });

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

export default actions;
