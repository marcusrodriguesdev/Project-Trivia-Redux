const LOGIN = 'LOGIN';

export default function Login(name, email, profile) {
  return ({
    type: LOGIN,
    payload: {
      name,
      email,
      profile,
    },
  });
}
