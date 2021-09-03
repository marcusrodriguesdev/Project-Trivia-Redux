export const SAVE_NAME = 'SAVE_NAME';
export const SAVE_EMAIL = 'SAVE_EMAIL';

export const saveName = (payload) => ({
  type: SAVE_NAME,
  payload,
});

export const saveEmail = (payload) => ({
  type: SAVE_EMAIL,
  payload,
});
