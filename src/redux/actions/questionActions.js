import { getQuestions } from '../../services/questionApi';

const QUESTION_ACTIONS = {
  REQUEST_API: 'REQUEST_API',
  FAILED_REQUEST: 'REQUEST_FAILED',
  SET_QUESTIONS: 'SET_QUESTIONS',
};

const requestApi = () => ({ type: QUESTION_ACTIONS.REQUEST_API });

const requestFailed = (error) => ({
  type: QUESTION_ACTIONS.FAILED_REQUEST,
  payload: error,
});

const setQuestions = (questions) => ({
  type: QUESTION_ACTIONS.SET_QUESTIONS,
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

export default QUESTION_ACTIONS;
