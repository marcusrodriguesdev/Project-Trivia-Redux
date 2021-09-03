import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Question from '../Components/Question';
import { fetchTriviaQuestions } from '../services/API';
import StopWatch from '../Components/stopWatch';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      currentQuestionIndex: 0,
      currentQuestion: {},
      loading: true,
      answerClicked: false,
    };

    this.fetchAndStoreQuestions = this.fetchAndStoreQuestions.bind(this);
    this.answerClick = this.answerClick.bind(this);
    this.nextClick = this.nextClick.bind(this);
    this.setCurrentQuestion = this.setCurrentQuestion.bind(this);
  }

  componentDidMount() {
    this.fetchAndStoreQuestions();
  }

  setCurrentQuestion(index) {
    const { questions } = this.state;
    console.log(questions);
    console.log(questions[index]);
    this.setState({
      currentQuestion: questions[index],
    });
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

  answerClick() {
    this.setState({
      answerClicked: true,
    });
  }

  nextClick() {
    const { currentQuestionIndex, currentQuestion } = this.state;
    this.setCurrentQuestion(currentQuestionIndex + 1);
    const newQuestionIndex = currentQuestionIndex + 1;
    this.setState({
      currentQuestionIndex: newQuestionIndex,
    });
    if (currentQuestion[newQuestionIndex] === undefined) {
      this.setState({
        currentQuestionIndex: 0,
      });
    }
  }

  render() {
    const { loading, answerClicked, currentQuestion } = this.state;
    console.log(currentQuestion);
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
          answerClicked={ answerClicked }
          nextClick={ this.nextClick }
        />
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
};
