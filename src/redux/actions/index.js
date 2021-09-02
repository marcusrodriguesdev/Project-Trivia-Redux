export const LOGGED_INFO = 'LOGGED_INFO';
export const LOADING = 'LOADING';

export const logged = (payload) => ({ type: LOGGED_INFO, payload });

export function getToken() {
  return async (dispatch) => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const result = await response.json();
    dispatch(logged(result));
  };
}
