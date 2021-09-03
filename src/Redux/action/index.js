import fecthApiQuestion from '../../services/fetchApiQuestions';

export const FETCH_API = 'SET_FETCH_API';
export const FETCH_API_ERROR = 'SET_FETCH_API';

export const setFetchApiSuccess = (payload) => ({
  type: FETCH_API,
  payload,
});

export const setFetchApiError = (payload) => ({
  type: FETCH_API_ERROR,
  payload,
});

export const fecthApiThunk = (token) => async (dispatch) => {
  try {
    const data = await fecthApiQuestion(token);
    dispatch(setFetchApiSuccess(data.results));
  } catch (error) {
    dispatch(setFetchApiError(error));
  }
};
