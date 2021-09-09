import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchTrivia from '../services/fetchTrivia';
import FeedbackHeader from '../components/FeedbackHeader';
import Timer from '../components/Timer';
import { changeStop, getTimer } from '../redux/actions';

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
      randomKey: true,
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

  async fetchTriviaGame() {
    const { endpoint, token } = this.props;
    const response = await fetchTrivia(endpoint, token);
    // console.log(response);
    this.setState({
      trivia: [...response],
      isLoading: false,
    });
  }

  nextButton() {
    const { addStop, addTimer } = this.props;
    const { trivia } = this.state;
    let { index } = this.state;
    const thirty = 30;
    // console.log(trivia.length);
    if (index < trivia.length - 1) {
      index += 1;
      this.setState({
        index,
        border: {},
        next: { display: 'none' },
      });
      addStop();
      addTimer(thirty);
    }
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

  addBorder(event) {
    const correctStyle = { border: '3px solid rgb(6, 240, 15)' };
    const wrongStyle = { border: '3px solid rgb(255, 0, 0)' };
    const { addStop, timer } = this.props;
    this.setState({
      border: { correctStyle, wrongStyle },
      next: {},
    });
    console.log(event.target.className);
    addStop();
    if (event.target.className === 'correct') {
      let difficulty = event.target.name;
      const three = 3;
      const ten = 10;
      if (difficulty === 'hard') difficulty = three;
      if (difficulty === 'medium') difficulty = 2;
      if (difficulty === 'easy') difficulty = 1;
      const points = ten + (timer * difficulty);
      console.log(points);
    }
  }

  arrayAnswersButtons() {
    const { trivia, index, border, randomKey, next } = this.state;
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
    if (randomKey) {
      this.randomizeAnswers(newArray);
    }
    return (
      <div>
        <p data-testid="question-category">{trivia[index].category}</p>
        <p data-testid="question-text">{trivia[index].question}</p>
        { newArray.map((element, ordem) => <span key={ ordem }>{element}</span>)}
        <button
          type="button"
          onClick={ this.nextButton }
          data-testid="btn-next"
          style={ next }
        >
          Próxima
        </button>
      </div>
    );
  }

  render() {
    // const { name, image } = this.props;
    const { isLoading } = this.state;
    return (
      <>
        <FeedbackHeader />
        <Timer />
        <section>
          { isLoading ? <p>Loading...</p> : this.arrayAnswersButtons() }
        </section>
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
  stop: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addStop: () => dispatch(changeStop()),
  addTimer: (timer) => dispatch(getTimer(timer)),
});

const mapStateToProps = (state) => ({
  name: state.reducer.name,
  image: state.reducer.image,
  token: state.reducer.token,
  endpoint: state.reducer.endpoint,
  timer: state.reducer.timer,
  stop: state.reducer.stop,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
