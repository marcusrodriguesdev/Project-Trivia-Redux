export const LOGIN = 'LOGIN';
export const TOKEN = 'TOKEN';

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const saveToken = (token) => ({
  type: TOKEN,
  token,
});

export const getToken = () => async (dispatch) => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const objResponse = await response.json();
  localStorage.setItem('token', objResponse.token);
  dispatch(saveToken(objResponse));
};
