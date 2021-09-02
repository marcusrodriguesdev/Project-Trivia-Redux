const TOKEN_ENDPOINT = 'https://opentdb.com/api_token.php?command=request';
const QUESTION_ENDPOINT = 'https://opentdb.com/api.php?amount=5';

export const getToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT);
  const data = await response.json();

  return data.token;
};

export const getQuestion = async (token) => {
  const response = await fetch(`${QUESTION_ENDPOINT}&token=${token}`);
  const data = await response.json();

  return data.results[0];
};
