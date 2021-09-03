const LOGIN = 'LOGIN';

export default function Login(name, email, profile, token) {
  return ({
    type: LOGIN,
    payload: {
      name,
      email,
      profile,
      token,
    },
  });
}
