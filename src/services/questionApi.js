import axios from 'axios';

const TOKEN_ENDPOINT = 'https://opentdb.com/api_token.php?command=request';
const QUESTION_ENDPOINT = 'https://opentdb.com/api.php?amount=5';

export const getToken = async () => {
  const { data } = await axios(TOKEN_ENDPOINT);

  return data.token;
};

export const getQuestion = async (token) => {
  const { data } = await axios(`${QUESTION_ENDPOINT}&token=${token}`);

  return data.results[0];
};
