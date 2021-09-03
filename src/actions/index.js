export const SAVE_NAME = 'SAVE_NAME';
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const FETCH_API_TRIVIA = 'FETCH_API_TRIVIA';

export const saveName = (payload) => ({
  type: SAVE_NAME,
  payload,
});

export const saveEmail = (payload) => ({
  type: SAVE_EMAIL,
  payload,
});

export const getQuestions = (questions) => ({
  type: GET_QUESTIONS,
  payload: {
    questions,
    isFetching: false,
  },
});

export const fetchTrivia = () => ({
  type: FETCH_API_TRIVIA,
  payload: {
    isFetching: true,
  },
});

export function saveQuestions() {
  return async (dispatch) => {
    dispatch(fetchTrivia());
    // trocar quantidade
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${localStorage.getItem('token')}`);
    const obj = await response.json();
    dispatch(getQuestions(obj.results));
  };
}
