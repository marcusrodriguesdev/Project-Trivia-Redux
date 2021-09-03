export const ACTIONS = {
  SET_EMAIL: 'SET_EMAIL',
  GET_TOKEN: 'GET_TOKEN',
};

export const setEmail = (email) => ({ type: ACTIONS.SET_EMAIL, payload: email });

export const getToken = (token) => ({ type: ACTIONS.GET_TOKEN, payload: token });

export function getTokenApi() {
  return async (dispath) => {
    const api = 'https://opentdb.com/api_token.php?command=request';
    const request = await fetch(api);
    const data = await request.json();
    const { token } = data;
    localStorage.setItem('token', token);
    dispath(getToken(token));
  };
}
