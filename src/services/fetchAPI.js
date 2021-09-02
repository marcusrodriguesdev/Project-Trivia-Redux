const TOKEN_URL = 'https://opentdb.com/api_token.php?command=request';

const fetchAPI = async () => {
  try {
    const response = await fetch(TOKEN_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export default fetchAPI;
