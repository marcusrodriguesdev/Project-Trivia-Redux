import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alternatives from '../components/Alternatives';
import Question from '../components/Question';
import
{ fetchQuestions as fetchQuestionsAction, setAssertions, setScore }
  from '../redux/actions/index';
import '../css/GamePage.css';

class GamePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionNumber: 0,
      seconds: 30,
    };

    this.applyColor = this.applyColor.bind(this);
    this.showNextQuestion = this.showNextQuestion.bind(this);
    this.removeColor = this.removeColor.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
    this.getCategory = this.getCategory.bind(this);
  }

  async componentDidMount() {
    const { fetchQuestions, player, settings } = this.props;
    await fetchQuestions(settings);
    this.updateSeconds();
    localStorage.setItem('state', JSON.stringify({ player: { ...player } }));
  }

  componentDidUpdate() {
    const { seconds } = this.state;
    if (seconds === 0) {
      clearInterval(this.countDown);
      this.applyColor();
    }
  }

  getCategory(category) {
    this.setState({ category });
  }

  calculateScore({ target: { name } }) {
    const { questionNumber, seconds } = this.state;
    const { questions: { results }, getScore, getAssertions, player } = this.props;
    const { difficulty, correct_answer: correctAnswer } = results[questionNumber];
    const difficultyScore = { easy: 1, medium: 2, hard: 3 };
    this.applyColor();

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

  applyColor() {
    const correct = document.querySelector('.correct');
    correct.className = 'correct correct-answer';
    correct.disabled = true;

    const incorrect = document.querySelectorAll('.incorrect');
    incorrect.forEach((item) => {
      item.className = 'incorrect incorrect-answer';
      item.disabled = true;
      return item;
    });

    const btnNext = document.querySelector('#btn-next');
    btnNext.className = 'display';

    clearInterval(this.countDown);
  }

  removeColor() {
    const correct = document.querySelector('.correct');
    correct.className = 'correct default';
    correct.disabled = false;

    const incorrect = document.querySelectorAll('.incorrect');
    incorrect.forEach((item) => {
      item.className = 'incorrect default';
      item.disabled = false;
      return item;
    });

    const btnNext = document.querySelector('#btn-next');
    btnNext.className = 'notDisplay';
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
    const { questionNumber, seconds, category } = this.state;
    return (
      <>
        <Question
          questionNumber={ questionNumber }
          getCategory={ this.getCategory }
        />

        <main className="main-game">
          <div className="center-div">
            <div className="seconds">
              <p>{ seconds }</p>
            </div>

            <div className="category">
              <span>{ category }</span>
            </div>

            <div className="next">
              <button
                type="button"
                onClick={ this.showNextQuestion }
                data-testid="btn-next"
                id="btn-next"
                className="notDisplay"
              >
                Próxima
              </button>
            </div>
          </div>

          <Alternatives
            calculateScore={ this.calculateScore }
            questionNumber={ questionNumber }
          />
        </main>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (settings) => dispatch(fetchQuestionsAction(settings)),
  getScore: (score) => dispatch(setScore(score)),
  getAssertions: (assert) => dispatch(setAssertions(assert)),
});

const mapStateToProps = (state) => ({
  questions: state.gamePage.questions,
  player: state.player,
  settings: state.settings,
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
  settings: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
