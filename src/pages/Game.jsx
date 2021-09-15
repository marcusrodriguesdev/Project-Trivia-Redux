import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchTrivia from '../services/fetchTrivia';
import FeedbackHeader from '../components/FeedbackHeader';
import Timer from '../components/Timer';
import { changeStop, getHits, getScore, getTimer } from '../redux/actions';
import { saveScore } from '../services/saveToLocal';
import './Game.css';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trivia: [],
      index: 0,
      isLoading: true,
      next: { display: 'none' },
      border: {
        correctStyle: {},
        wrongStyle: {},
      },
    };

    this.fetchTriviaGame = this.fetchTriviaGame.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.arrayAnswersButtons = this.arrayAnswersButtons.bind(this);
    this.arrayAnswers = this.arrayAnswers.bind(this);
    this.randomizeAnswers = this.randomizeAnswers.bind(this);
    this.addBorder = this.addBorder.bind(this);
  }

  componentDidMount() {
    this.fetchTriviaGame();
  }

  shouldComponentUpdate(_, nextState) {
    const { index, isLoading } = this.state;
    console.log(index, nextState.index, nextState.next);
    if (isLoading === true && nextState.isLoading === false) return true;
    if (!nextState.next.display) return true;
    if (index === nextState.index) return false;
    return true;
  }

  async fetchTriviaGame() {
    const { endpoint, token } = this.props;
    const response = await fetchTrivia(endpoint, token);
    this.setState({
      trivia: [...response],
      isLoading: false,
    });
  }

  nextButton() {
    const { addStop, addTimer, timer, history } = this.props;
    const { trivia } = this.state;
    let { index } = this.state;
    const thirty = 30;
    if (index < trivia.length - 1) {
      index += 1;
      this.setState({
        index,
        border: {},
        next: { display: 'none' },
      });
      if (timer !== 0) addStop();
      addTimer(thirty);
    } else { history.push('/feedback'); }
  }

  arrayAnswers({ incorrect_answers: incorrectAnswers, correct_answer: correctAnswer }) {
    const allAnswers = [...incorrectAnswers, correctAnswer];
    return allAnswers;
  }

  randomizeAnswers(array) {
    // Esse código foi tirado do StackOverFlow. Ele serve para randomizar um array
    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

    let currentIndex = array.length;
    let randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  save(points) {
    const { addScore, addHit } = this.props;
    saveScore(points);
    addScore(points);
    addHit();
  }

  addBorder(event) {
    const correctStyle = { border: '3px solid rgb(6, 240, 15)' };
    const wrongStyle = { border: '3px solid rgb(255, 0, 0)' };
    const { addStop, timer } = this.props;
    this.setState({
      border: { correctStyle, wrongStyle },
      next: {},
    });
    addStop();
    if (event.target.className === 'correct') {
      let difficulty = event.target.name;
      const three = 3;
      const ten = 10;
      if (difficulty === 'hard') difficulty = three;
      if (difficulty === 'medium') difficulty = 2;
      if (difficulty === 'easy') difficulty = 1;
      const points = ten + (timer * difficulty);
      this.save(points);
    } else saveScore(0);
  }

  arrayAnswersButtons() {
    const { trivia, index, border } = this.state;
    const { stop, timer } = this.props;
    let buttonDisabled = timer <= 0;
    if (stop === true) buttonDisabled = true;
    let newArray = this.arrayAnswers(trivia[index]);
    newArray = newArray.map((element, indic) => (indic < newArray.length - 1 ? (
      <button
        className="wrong"
        type="button"
        data-testid={ `wrong-answer-${indic}` }
        onClick={ this.addBorder }
        style={ border.wrongStyle }
        disabled={ buttonDisabled }
      >
        {element}
      </button>)
      : (
        <button
          name={ trivia[index].difficulty }
          className="correct"
          type="button"
          data-testid="correct-answer"
          onClick={ this.addBorder }
          style={ border.correctStyle }
          disabled={ buttonDisabled }
        >
          {element}
        </button>)));
    this.randomizeAnswers(newArray);
    return (
      <div className="teste2">
        <p
          data-testid="question-category"
          className="teste category"
        >
          {trivia[index].category}
        </p>
        <p data-testid="question-text" className="teste">{trivia[index].question}</p>
        { newArray.map((element, ordem) => <span key={ ordem }>{element}</span>)}
      </div>
    );
  }

  render() {
    const { timer } = this.props;
    const { isLoading } = this.state;
    let { next } = this.state;
    if (timer === 0) next = {};
    return (
      <>
        { isLoading ? <p>Loading...</p> : (
          <section>
            <Timer />
            <FeedbackHeader />
            { this.arrayAnswersButtons() }
          </section>
        )}
        <div className="line">
          <div className="first-question questions" />
          <div className="second-question questions" />
          <div className="third-question questions" />
          <div className="fourth-question questions" />
          <div className="fifth-question questions" />
        </div>
        <button
          type="button"
          onClick={ this.nextButton }
          data-testid="btn-next"
          style={ next }
          className="next-button"
        >
          Próxima
        </button>
      </>
    );
  }
}

Game.propTypes = {
  token: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
  timer: PropTypes.number.isRequired,
  addStop: PropTypes.func.isRequired,
  addTimer: PropTypes.func.isRequired,
  addScore: PropTypes.func.isRequired,
  addHit: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  stop: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addStop: () => dispatch(changeStop()),
  addHit: () => dispatch(getHits()),
  addTimer: (timer) => dispatch(getTimer(timer)),
  addScore: (score) => dispatch(getScore(score)),
});

const mapStateToProps = (state) => ({
  name: state.userReducer.name,
  image: state.userReducer.image,
  token: state.userReducer.token,
  endpoint: state.userReducer.endpoint,
  timer: state.timerReducer.timer,
  stop: state.timerReducer.stop,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
