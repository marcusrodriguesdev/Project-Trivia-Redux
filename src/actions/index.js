const actionLogin = (user, email) => ({
  type: 'ACTION_LOGIN',
  payload: {
    user,
    email,
  },
});

export default actionLogin;
