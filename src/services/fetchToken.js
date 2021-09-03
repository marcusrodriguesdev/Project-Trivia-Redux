const apiToken = 'https://opentdb.com/api_token.php?command=request';

const fetchToken = async () => {
  const response = await fetch(apiToken);
  const data = response.json();
  console.log(data);
  return data;
};

export default fetchToken;
