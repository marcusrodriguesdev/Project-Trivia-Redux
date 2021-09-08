import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Question from '../components/question';
import { fetchTriviaQuestions } from '../services/API';
import StopWatch from '../components/stopWatch';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      currentQuestionIndex: 0,
      currentQuestion: {},
      loading: true,
    };

    this.fetchAndStoreQuestions = this.fetchAndStoreQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.nextClick = this.nextClick.bind(this);
    this.setCurrentQuestion = this.setCurrentQuestion.bind(this);
  }

  componentDidMount() {
    this.fetchAndStoreQuestions();
    this.setLocalStorageInitial();
  }

  setCurrentQuestion(index) {
    const { questions } = this.state;
    this.setState({
      currentQuestion: questions[index],
    });
  }

  setLocalStorageInitial() {
    const state = {
      player: {
        name: '',
        assertions: '',
        score: 0,
        gravatarEmail: '',
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
  }

  async fetchAndStoreQuestions() {
    const { token } = this.props;
    const { currentQuestionIndex } = this.state;
    const re2 = await fetchTriviaQuestions(token);
    const { results } = re2;
    this.setState({
      questions: [...results],
    });
    this.setCurrentQuestion(currentQuestionIndex);
    this.setState({
      loading: false,
    });
  }

  handleClick() {
    const { history } = this.props;
    history.push('/ranking');
  }

  nextClick() {
    const { currentQuestionIndex, questions } = this.state;
    const newQuestionIndex = currentQuestionIndex + 1;
    if (newQuestionIndex === questions.length) {
      this.setState({
        currentQuestionIndex: 0,
      });
      this.setCurrentQuestion(0);
    } else {
      this.setState({
        currentQuestionIndex: newQuestionIndex,
      });
      this.setCurrentQuestion(newQuestionIndex);
    }
  }

  render() {
    const { loading, currentQuestion } = this.state;
    if (loading) {
      return (
        <div>carregando...</div>
      );
    }

    return (
      <>
        <Header />
        <Question
          key={ currentQuestion.question }
          category={ currentQuestion.category }
          question={ currentQuestion.question }
          correctAnswer={ currentQuestion.correct_answer }
          incorrectAnswers={ currentQuestion.incorrect_answers }
          answerClick={ this.answerClick }
          nextClick={ this.nextClick }
          difficulty={ currentQuestion.difficulty }
        />
        <button type="button" data-testid="btn-ranking" onClick={ this.handleClick }>
          Ver Ranking
        </button>
        <StopWatch />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.game.token.token,
});

export default connect(mapStateToProps)(Home);

Home.propTypes = {
  token: PropTypes.string.isRequired,
  history: PropTypes.func.isRequired,
};
