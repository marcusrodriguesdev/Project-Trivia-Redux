const STORE_TOKEN = 'STORE_TOKEN';

export const storeToken = (token) => ({
  type: STORE_TOKEN,
  payload: {
    token,
  },
});

export const fetchToken = () => async (dispatch) => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const result = await response.json();
    localStorage.setItem('token', result.token);
    dispatch(storeToken(result.token));
  } catch (error) {
    console.log(error);
  }
};
