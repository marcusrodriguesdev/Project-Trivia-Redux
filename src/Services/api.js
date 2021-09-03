const TOKEN_API = 'https://opentdb.com/api_token.php?command=request';
const QUESTIONS_API = 'https://opentdb.com/api.php?amount=5';

export const fetchToken = async () => {
  const response = await fetch(TOKEN_API);
  const data = await response.json();

  return data;
};

export const fetchQuestions = async (token) => {
  const response = await fetch(`${QUESTIONS_API}&token=${token}`);
  const data = await response.json();

  return data.results;
};
