const LOGIN = 'LOGIN';
const SCORE = 'SCORE';

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

export function setScore(name, email, profile, score) {
  return ({
    type: SCORE,
    payload: {
      name,
      email,
      profile,
      score,
    },
  });
}
