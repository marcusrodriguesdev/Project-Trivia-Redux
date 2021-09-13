import { getQuestions, getCategories } from '../../services/questionApi';

const QUESTION_ACTIONS = {
  REQUEST_API: 'REQUEST_API',
  FAILED_REQUEST: 'REQUEST_FAILED',
  SET_QUESTIONS: 'SET_QUESTIONS',
  GET_CATEGORIES: 'GET_CATEGORIES',
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

const getCategoriesAction = (categoryList) => ({
  type: QUESTION_ACTIONS.GET_CATEGORIES,
  payload: categoryList,
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

export const fetchCategoriesThunk = () => async (dispatch) => {
  dispatch(requestApi());

  try {
    const categoryList = await getCategories();

    dispatch(getCategoriesAction(categoryList));
  } catch (error) {
    dispatch(requestFailed(error.message));
  }
};

export default QUESTION_ACTIONS;
