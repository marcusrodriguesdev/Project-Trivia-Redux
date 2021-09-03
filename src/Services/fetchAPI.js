// const urlToFetch = 'https://br.gravatar.com/site/implement/hash/';
const QUESTION_EP = 'https://opentdb.com/api.php?amount=5';

// export const getToken = async () => {
//   const { response } = await fetch('https://www.gravatar.com/avatar/');
//   return response.token;
// };

/*
  ref:
  https://stackoverflow.com/questions/42921220/is-any-solution-to-do-localstorage-setitem-in-asynchronous-way-in-javascript#:~:text=localStorage%20is%20a%20synchronous%20API,%2C%20value)%20%7B%20return%20Promise.
 */

// export const asyncLocalStorage = {
//   setItem(key, value) {
//     return Promise.resolve().then(() => {
//       localStorage.setItem(key, value);
//     });
//   },
//   getItem(key) {
//     return Promise.resolve().then(() => localStorage.getItem(key));
//   },
// };

export const getQuestion = async (token) => {
  const response = await fetch(`${QUESTION_EP}&token=${token}`);
  const responseJson = await response.json();
  console.log(responseJson.results);
  return responseJson.results;
};

export const getToken = () => {
  fetch('https://opentdb.com/api_token.php?command=request')
    .then((token) => token.json())
    .then((tokenJson) => localStorage.setItem('token', tokenJson.token));
};
