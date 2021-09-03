export const TOKEN_TYPE = 'token';

export const tokenAction = (token) => ({
  type: TOKEN_TYPE,
  payload: { token },
});

export const tokenActionThunk = () => async (dispatch) => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  const { token } = data;

  dispatch(tokenAction(token));
};
