import axios from 'axios';

import shuffleAnswers from '../utils/shuffleAnswers';

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

  const decodedResults = data.results.map((questionInfo) => {
    const shuffledAnswers = shuffleAnswers(
      questionInfo.incorrect_answers,
      questionInfo.correct_answer,
    );

    return {
      question: decodeURIComponent(questionInfo.question),
      category: decodeURIComponent(questionInfo.category),
      correctAnswer: decodeURIComponent(questionInfo.correct_answer),
      difficulty: questionInfo.difficulty,
      shuffledAnswers,
    };
  });

  return decodedResults;
};
