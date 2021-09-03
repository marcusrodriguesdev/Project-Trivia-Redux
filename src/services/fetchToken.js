const apiToken = 'https://opentdb.com/api_token.php?command=request';

const fetchToken = async () => {
  const response = await fetch(apiToken);
  const data = await response.json();
  console.log(data.token);
  return data.token;
};

export default fetchToken;
