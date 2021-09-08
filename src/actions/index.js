export const ACTIONS = {
  SET_EMAIL: 'SET_EMAIL',
  GET_TOKEN: 'GET_TOKEN',
  SET_SCORE: 'SET_SCORE',
};

export const setEmail = (payload) => ({ type: ACTIONS.SET_EMAIL, payload });

export const getToken = (token) => ({ type: ACTIONS.GET_TOKEN, payload: token });

export const setScore = (score) => ({ type: ACTIONS.SET_SCORE, payload: score });

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

export function setLocalStorageThunk() {
  return async (_, getState) => {
    localStorage.setItem('state', JSON.stringify(getState()));
  };
}
