import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addTriviaThunk, userTry, showNextButton } from '../actions';
import '../Game.css';

const INITIAL_STATE = {
  questionIndex: 0,
  seconds: 30,
  disabledState: false,
};

const dez = 10;
const easy = 1;
const medium = 2;
const hard = 3;

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;

    this.handleNext = this.handleNext.bind(this);
    this.questions = this.questions.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.handlePoints = this.handlePoints.bind(this);
    // this.disableButton = this.disableButton.bind(this);
  }

  componentDidMount() {
    const { addTrivia } = this.props;
    addTrivia();
    this.startTimer();
  }

  startTimer() {
    const ONE_SECOND = 1000;
    this.intervalId = setInterval(() => {
      this.countdown();
    }, ONE_SECOND);
  }

  countdown() {
    const TIME_LIMIT_IN_SECONDS = 0;
    const { seconds } = this.state;
    if (seconds > TIME_LIMIT_IN_SECONDS) {
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
    } else {
      const { addTry, buttonRender } = this.props;
      addTry(true);
      buttonRender();
      this.setState({
        disabledState: true,
      });
    }
  }

  handlePoints(event) {
    const { seconds, questionIndex } = this.state;
    const { results } = this.props;
    let dificuldade;
    let score = 0;
    if (results[questionIndex].difficulty === 'easy') {
      dificuldade = easy;
    } else if (results[questionIndex].difficulty === 'medium') {
      dificuldade = medium;
    } else if (results[questionIndex].difficulty === 'hard') {
      dificuldade = hard;
    }
    const totalPoints = JSON.parse(localStorage.getItem('state'));
    if (event.target.classList.contains('certaResposta')) {
      score = dez + (seconds * dificuldade);
      totalPoints.player.assertions += 1;
    }
    totalPoints.player.score += score;
    localStorage.setItem('state', JSON.stringify(totalPoints));
  }

  handleClick(event) {
    // const { questionIndex } = this.state;
    const { addTry, buttonRender } = this.props;
    addTry(true);
    buttonRender();
    this.setState({
      disabledState: true,
    });
    this.handlePoints(event);
  }

  handleNext() {
    const { addTry, history } = this.props;
    const { questionIndex } = this.state;
    const INDEX_QUESTION = 4;

    if (questionIndex < INDEX_QUESTION) {
      this.setState((prevState) => ({
        questionIndex: prevState.questionIndex + 1,
        seconds: 30,
        disabledState: false,
      }));
    } else {
      history.push('/feedback');
    }

    addTry(false);

    // this.setState((prevState) => ({
    //   questionIndex: prevState.questionIndex + 1,
    //   seconds: 30,
    //   disabledState: false,
    // }));
  }

  questions() {
    const { results, tryUser } = this.props;
    const { questionIndex, disabledState } = this.state;
    return (
      <div key={ 0 }>
        <p data-testid="question-category">{results[questionIndex].category}</p>
        <p data-testid="question-text">{results[questionIndex].question}</p>
        <button
          className={ tryUser ? 'correct certaResposta' : 'certaResposta' }
          id="teste"
          type="button"
          data-testid="correct-answer"
          onClick={ this.handleClick }
          disabled={ disabledState }
        >
          {results[questionIndex].correct_answer}
        </button>
        {results[questionIndex].incorrect_answers.map(
          (wrongResult, index2) => (
            <button
              className={ tryUser ? 'incorrect' : '' }
              key={ index2 }
              type="button"
              data-testid={ `wrong-answer-${index2}` }
              onClick={ this.handleClick }
              disabled={ disabledState }
            >
              {wrongResult}
            </button>),
        )}
      </div>
    );
  }

  render() {
    const nextButton = (
      <button
        className="next-button"
        data-testid="btn-next"
        id="javascript"
        type="button"
        onClick={ this.handleNext }
      >
        Próximo
      </button>);
    const { results, gravatarURL, name, tryUser } = this.props;
    const { seconds } = this.state;
    return (
      <div>
        <header>
          <div className="player-avatar">
            <img
              src={ gravatarURL }
              alt="Player Avatar"
              data-testid="header-profile-picture"
            />
          </div>
          <p data-testid="header-player-name">{name}</p>
          <p data-testid="header-score">0</p>
          <p>{seconds}</p>
        </header>
        <div className="answers">
          {results
          && this.questions()}
          { tryUser && nextButton }

        </div>
      </div>
    );
  }
}

Game.propTypes = {
  addTrivia: PropTypes.func.isRequired,
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  gravatarURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  addTry: PropTypes.func.isRequired,
  tryUser: PropTypes.objectOf(PropTypes.any).isRequired,
  buttonRender: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  results: state.triviaReducer.results,
  gravatarURL: state.gravatar.gravatarURL,
  name: state.loginReducer.name,
  tryUser: state.triviaReducer.tryUser,
  renderButton: state.triviaReducer.renderButton,
  triviaIndex: state.triviaIndexReducer.index,
});

const mapDispatchToProps = (dispatch) => ({
  addTrivia: (localStorage) => dispatch(addTriviaThunk(localStorage)),
  addTry: (param) => dispatch(userTry(param)),
  buttonRender: () => dispatch(showNextButton()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
