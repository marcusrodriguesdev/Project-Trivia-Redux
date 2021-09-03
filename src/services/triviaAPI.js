const TRIVIA_URL = 'https://opentdb.com/api.php?amount=5&token=';

const fetchTrivia = async (token) => {
//   console.log(token);
  const response = await fetch(`${TRIVIA_URL}${token}`);
  const questions = await response.json();
  return questions;
};

export default fetchTrivia;
