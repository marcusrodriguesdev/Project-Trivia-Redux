import axios from 'axios';

const TOKEN_ENDPOINT = 'https://opentdb.com/api_token.php?command=request';
const QUESTION_ENDPOINT = 'https://opentdb.com/api.php?amount=5';

export const getToken = async () => {
  const { data } = await axios(TOKEN_ENDPOINT);

  return data.token;
};

export const getQuestions = async (token) => {
  const { data } = await axios(
    `${QUESTION_ENDPOINT}&token=${token}&encode=url3986`,
  );

  const decodedResults = data.results.map((questionInfo) => ({
    question: decodeURIComponent(questionInfo.question),
    correctAnswer: decodeURIComponent(questionInfo.correct_answer),
    category: decodeURIComponent(questionInfo.category),
    incorrectAnswers: questionInfo.incorrect_answers.map((answer) => (
      decodeURIComponent(answer)
    )),
  }));

  return decodedResults;
};
