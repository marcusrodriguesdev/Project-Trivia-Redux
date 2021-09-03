import { getQuestions } from '../../services/questionApi';

const GAME_ACTIONS = {
  GUESS: 'GUESS',
  NEXT_QUESTION: 'NEXT_QUESTION',
  REQUEST_API: 'REQUEST_API',
  FAILED_REQUEST: 'REQUEST_FAILED',
  SET_QUESTIONS: 'SET_QUESTIONS',
};

export const guess = () => ({ type: GAME_ACTIONS.GUESS });

export const nextQuestion = () => ({ type: GAME_ACTIONS.NEXT_QUESTION });

const requestApi = () => ({ type: GAME_ACTIONS.REQUEST_API });

const requestFailed = (error) => ({
  type: GAME_ACTIONS.FAILED_REQUEST,
  payload: error,
});

const setQuestions = (questions) => ({
  type: GAME_ACTIONS.SET_QUESTIONS,
  payload: questions,
});

export const fetchQuestionsThunk = () => async (dispatch, getState) => {
  dispatch(requestApi());

  try {
    const { auth } = getState();
    const questions = await getQuestions(auth.token);

    dispatch(setQuestions(questions));
  } catch (error) {
    dispatch(requestFailed(error.message));
  }
};

export default GAME_ACTIONS;
