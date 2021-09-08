const apiToken = 'https://opentdb.com/api_token.php?command=request';

const fetchToken = async () => {
  const response = await fetch(apiToken);
  const data = await response.json();
  const { token } = data;
  // console.log(data);
  localStorage.setItem('token', token);
  return token;
};

export default fetchToken;
