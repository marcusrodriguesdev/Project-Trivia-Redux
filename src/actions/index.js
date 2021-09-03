export const TOKEN_TYPE = 'token';
export const SET_PLAYER_VALUE = 'SET_PLAYER_VALUE';

export const tokenAction = (token) => ({
  type: TOKEN_TYPE,
  payload: { token },
});

export const setPlayerValueAction = (payload) => ({
  type: SET_PLAYER_VALUE, payload,
});

export const tokenActionThunk = () => async (dispatch) => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  const { token } = data;

  dispatch(tokenAction(token));
};
