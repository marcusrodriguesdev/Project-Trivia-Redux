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

export const fecthApiThunk = () => async (dispatch) => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    dispatch(setFetchApiSuccess(data));
  } catch (error) {
    dispatch(setFetchApiError(error));
  }
};
