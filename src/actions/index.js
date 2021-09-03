export const LOGIN = 'LOGIN';

const userLogin = (email) => ({
  type: LOGIN,
  user: {
    email,
  },
});

export default userLogin;
