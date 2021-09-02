const TOKEN_API = 'https://opentdb.com/api_token.php?command=request';

const fetchToken = async () => {
  const response = await fetch(TOKEN_API);
  const token = await response.json();
  console.log(token);
  return token;
};

export default fetchToken;
