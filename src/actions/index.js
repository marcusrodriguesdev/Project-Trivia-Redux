const LOGIN = 'LOGIN';

export default function Login(name, email) {
  return ({
    type: LOGIN,
    payload: {
      name,
      email,
    },
  });
}
