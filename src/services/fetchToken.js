// import getToken from '../redux/actions';

const apiToken = 'https://opentdb.com/api_token.php?command=request';

const fetchToken = async () => {
  const response = await fetch(apiToken);
  const data = await response.json();
  const { token } = data;
  console.log(token);
  // const player = JSON.parse(localStorage.getItem('player'));
  // localStorage.setItem('player', JSON.stringify({ ...player, name }));
  // localStorage.setItem('token', JSON.stringify(token));
  // dispatch(getToken({ token, name, email }));
};

export default fetchToken;
