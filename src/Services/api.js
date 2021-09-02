const BASE_API = 'https://opentdb.com/api_token.php?command=request';

export const fetchToken = async () => {
  const response = await fetch(BASE_API);
  const data = await response.json();

  return data;
};

export default fetchToken;
