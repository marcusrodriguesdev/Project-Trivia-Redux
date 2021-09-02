import React from 'react';
import Question from '../Components/Question';
import { fetchTriviaQuestions, fetchTriviaToken } from '../services/API';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      loading: true,
    };

    this.fetchAndStoreQuestions = this.fetchAndStoreQuestions.bind(this);
  }

  componentDidMount() {
    this.fetchAndStoreQuestions();
  }

  async fetchAndStoreQuestions() {
    const re = await fetchTriviaToken();
    const { token } = re;
    const re2 = await fetchTriviaQuestions(token);
    const { results } = re2;
    this.setState({
      questions: [...results],
      loading: false,
    });
  }

  render() {
    const { questions, loading } = this.state;
    const question = questions[0];
    if (loading) {
      return (
        <div>carregando...</div>
      );
    }
    return (
      <Question
        key={ question.question }
        category={ question.category }
        question={ question.question }
        correctAnswer={ question.correct_answer }
        incorrectAnswers={ question.incorrect_answers }
      />
    );
  }
}

export default Home;
