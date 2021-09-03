const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
const TOKEN_FAIL = 'TOKEN_FAIL';
const SET_NAME = 'SET_NAME';
const SET_EMAIL = 'SET_EMAIL';

export const fetchTokenSuccess = (payload) => ({
  type: TOKEN_SUCCESS,
  payload,
});

export const fetchTokenFail = (payload) => ({
  type: TOKEN_FAIL,
  payload,
});

export const fetchTokenThunk = () => async (dispatch) => {
  try {
    const fetchApi = await fetch('https://opentdb.com/api_token.php?command=request');
    const json = await fetchApi.json();
    const { token } = json;
    return dispatch(fetchTokenSuccess(token));
  } catch (error) {
    return dispatch(fetchTokenFail(error));
  }
};

export const setNameAction = (payload) => ({
  type: SET_NAME,
  payload,
});

export const setEmailAction = (payload) => ({
  type: SET_EMAIL,
  payload,
});
