import fetchToken from '../../services/tokenAPI';

export const REQUEST_TOKEN_SUCCESS = 'REQUEST_TOKEN_SUCCESS';
export const REQUEST_TOKEN_ERROR = 'REQUEST_TOKEN_ERROR';
export const LOGIN = 'LOGIN';

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

const requestTokenSuccess = (payload) => ({
  type: REQUEST_TOKEN_SUCCESS,
  payload,
});

const requestTokenError = (payload) => ({
  type: REQUEST_TOKEN_ERROR,
  payload,
});

export const requestTokenThunk = () => async (dispatch) => {
  try {
    const response = await fetchToken();
    return dispatch(requestTokenSuccess(response));
  } catch (error) {
    dispatch(requestTokenError(error));
  }
};
