import getToken from '../../Services/getToken';

export const CLICK_BUTTON_LOGIN = 'CLICK_BUTTON_LOGIN';

export const SET_TOKEN = 'SET_TOKEN';

export const ClickButtonLogin = (payload) => ({
  type: CLICK_BUTTON_LOGIN,
  payload,
});

export const setGame = (payload) => ({
  type: SET_TOKEN,
  payload,
});

export const fetchToken = () => async (dispatch) => {
  const token = await getToken();
  localStorage.setItem('token', JSON.stringify(token));
  dispatch(setGame(token));
};
