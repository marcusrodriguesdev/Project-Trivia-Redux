import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alternatives from '../components/Alternatives';
import Question from '../components/Question';
import
{ fetchQuestions as fetchQuestionsAction, setAssertions, setScore }
  from '../redux/actions/index';

class GamePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      next: false,
      questionNumber: 0,
      seconds: 30,
    };

    this.toggleNextButton = this.toggleNextButton.bind(this);
    this.applyColor = this.applyColor.bind(this);
    this.showNextQuestion = this.showNextQuestion.bind(this);
    this.removeColor = this.removeColor.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
  }

  async componentDidMount() {
    const { fetchQuestions, player } = this.props;
    await fetchQuestions();

    this.updateSeconds();
    localStorage.setItem('state', JSON.stringify({ player: { ...player } }));
    localStorage.setItem('ranking', JSON.stringify([]));
  }

  componentDidUpdate() {
    const { seconds } = this.state;
    if (seconds === 0) {
      clearInterval(this.countDown);
    }
  }

  calculateScore({ target: { name } }) {
    const { questionNumber, seconds } = this.state;
    const { questions: { results }, getScore, getAssertions, player } = this.props;
    const { difficulty, correct_answer: correctAnswer } = results[questionNumber];
    const difficultyScore = { easy: 1, medium: 2, hard: 3 };

    if (name === correctAnswer) {
      const STATIC_POINT = 10;
      const result = (STATIC_POINT + seconds * difficultyScore[difficulty])
        + player.score;
      const assertions = player.assertions + 1;
      getScore(result);
      getAssertions(assertions);
      localStorage
        .setItem('state', JSON.stringify({ player:
          { ...player, score: result, assertions } }));
    }
  }

  updateSeconds() {
    const ONE_SECOND = 1000;
    this.countDown = setInterval(() => {
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
    }, ONE_SECOND);
  }

  applyColor(e) {
    const correct = document.querySelector('.correct');
    correct.className = 'correct correct-answer';

    const incorrect = document.querySelectorAll('.incorrect');
    incorrect.forEach((item) => {
      item.className = 'incorrect incorrect-answer';
      return item;
    });

    clearInterval(this.countDown);
    this.calculateScore(e);
    this.toggleNextButton();
  }

  removeColor() {
    const correct = document.querySelector('.correct');
    correct.className = 'correct default';

    const incorrect = document.querySelectorAll('.incorrect');
    incorrect.forEach((item) => {
      item.className = 'incorrect default';
      return item;
    });

    this.toggleNextButton();
  }

  toggleNextButton() {
    this.setState((previousValue) => ({
      next: !previousValue.next,
    }));
  }

  showNextQuestion() {
    const { history } = this.props;
    const { questionNumber } = this.state;
    const LIMIT = 4;
    this.removeColor();

    if (questionNumber === LIMIT) {
      history.push('/feedback');
    } else {
      this.setState((prev) => ({
        questionNumber: prev.questionNumber + 1,
        seconds: 30,
      }));
      this.updateSeconds();
    }
  }

  render() {
    const { next, questionNumber, seconds } = this.state;
    return (
      <div>
        <p>{ seconds }</p>
        <Question
          questionNumber={ questionNumber }
        />

        <Alternatives
          applyColor={ this.applyColor }
          questionNumber={ questionNumber }
          seconds={ seconds }
          next={ next }
        />

        <div>
          { next && (
            <button
              type="button"
              onClick={ this.showNextQuestion }
              data-testid="btn-next"
            >
              Proxima
            </button>) }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: () => dispatch(fetchQuestionsAction()),
  getScore: (score) => dispatch(setScore(score)),
  getAssertions: (assert) => dispatch(setAssertions(assert)),
});

const mapStateToProps = (state) => ({
  questions: state.gamePage.questions,
  player: state.player,
});

GamePage.propTypes = {
  fetchQuestions: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  questions: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
  getScore: PropTypes.func.isRequired,
  player: PropTypes.shape({
    score: PropTypes.number,
    assertions: PropTypes.number,
  }).isRequired,
  getAssertions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
