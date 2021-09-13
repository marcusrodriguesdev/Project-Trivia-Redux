import axios from 'axios';

import shuffleAnswers from '../utils/shuffleAnswers';

const TOKEN_ENDPOINT = 'https://opentdb.com/api_token.php?command=request';
const QUESTION_ENDPOINT = 'https://opentdb.com/api.php?amount=5';
const CATEGORY_ENDPOINT = 'https://opentdb.com/api_category.php';

export const getToken = async () => {
  const { data } = await axios(TOKEN_ENDPOINT);

  return data.token;
};

export const getCategories = async () => {
  const { data } = await axios(CATEGORY_ENDPOINT);

  return data.trivia_categories;
};

export const getUserConfigs = () => {
  const configs = localStorage.getItem('userConfigs');

  if (configs) {
    const parsedConfigs = JSON.parse(configs);

    return parsedConfigs;
  }

  return {};
};

export const getQuestions = async (token) => {
  const { category = '', difficulty = '', type = '' } = getUserConfigs();
  const options = `category=${category}&difficulty=${difficulty}&type=${type}`;

  let { data } = await axios(
    `${QUESTION_ENDPOINT}&token=${token}&encode=url3986&${options}`,
  );

  if (!data.results.length) {
    const response = await axios(
      `${QUESTION_ENDPOINT}&token=${token}&encode=url3986`,
    );

    data = response.data;
  }

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

export const difficulties = [
  {
    name: 'Any',
    id: '',
  },
  {
    name: 'Easy',
    id: 'easy',
  },
  {
    name: 'Medium',
    id: 'medium',
  },
  {
    name: 'Hard',
    id: 'hard',
  },
];

export const types = [
  {
    name: 'Both',
    id: '',
  },
  {
    name: 'Multiple Choice',
    id: 'multiple',
  },
  {
    name: 'True / False',
    id: 'boolean',
  },
];
