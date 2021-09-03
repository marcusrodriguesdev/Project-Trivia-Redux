const ACTIONS = {
  GET_TOKEN: 'GET_TOKEN',
};

const getToken = (token) => ({
  type: ACTIONS.GET_TOKEN, token,
});

export default (ACTIONS, getToken);
