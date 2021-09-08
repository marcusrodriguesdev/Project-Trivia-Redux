export const SET_USER = 'SET_USER';
export const SET_SETTINGS = 'SET_SETTINGS';

export const setUser = (payload) => ({
  type: SET_USER,
  payload,
});

export const setSettings = (payload) => ({
  type: SET_SETTINGS,
  payload,
});
