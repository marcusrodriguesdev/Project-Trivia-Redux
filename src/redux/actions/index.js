export const ACTIONS = {
  GET_TOKEN: 'GET_TOKEN',
};

export const getToken = (token) => ({
  type: ACTIONS.GET_TOKEN, token,
});

export const getNameAndEmail = (name, email) => ({
  type: 'NAME_EMAIL',
  name,
  email,
});

// export default (ACTIONS, getToken, getNameAndEmail);
