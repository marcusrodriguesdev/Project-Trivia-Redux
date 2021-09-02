import getToken from '../services/api';

export const ADD_TOKEN = 'ADD_TOKEN';

export const getTokenAction = (payload) => ({
  type: ADD_TOKEN,
  payload,
});

export const getTokenThunk = () => async (dispatch) => {
  const token = await getToken();
  dispatch(getTokenAction(token.token));
};
