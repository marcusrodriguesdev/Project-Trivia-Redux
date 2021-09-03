// const urlToFetch = 'https://br.gravatar.com/site/implement/hash/';
const QUESTION_EP = 'https://opentdb.com/api.php?amount=5';

// export const getToken = async () => {
//   const { response } = await fetch('https://www.gravatar.com/avatar/');
//   return response.token;
// };

export const getQuestion = async (token) => {
  const { response } = await fetch(`${QUESTION_EP}&token=${token}`);
  return response;
};

export const getToken = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const tokenJson = await response.json();
  localStorage.setItem('token', tokenJson.token);
  return tokenJson.token;
};
