const URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';

const getToken = async () => {
  const response = await fetch(URL_TOKEN);
  const data = response.json();
  return data;
};

export default getToken;
