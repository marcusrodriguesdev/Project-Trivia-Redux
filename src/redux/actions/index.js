import { fetchToken, fetchQuestion } from '../../services/fetchAPI';

export const GET_TOKEN = 'GET_TOKEN';
export const SET_QUESTION = 'SET_QUESTION';

export const getToken = (payload) => ({
  type: GET_TOKEN,
  payload,
});

export const setQuestion = (payload) => ({
  type: SET_QUESTION,
  payload,
});

export const getTokenThunk = () => async (dispatch) => {
  const payload = await fetchToken();
  dispatch(getToken(payload));
};

export const getQuestionThunk = (token) => async (dispatch) => {
  const payload = await fetchQuestion(token);
  dispatch(setQuestion(payload));
};
