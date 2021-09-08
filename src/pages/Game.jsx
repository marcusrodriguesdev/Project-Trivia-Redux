import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchTrivia from '../services/fetchTrivia';
import FeedbackHeader from '../components/FeedbackHeader';
import Timer from '../components/Timer';

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
      teste: true,
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
    const { trivia } = this.state;
    let { index } = this.state;
    // console.log(trivia.length);

    if (index < trivia.length - 1) {
      index += 1;
      this.setState({
        index,
        border: {},
        next: { display: 'none' },
      });
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

  addBorder() {
    const correctStyle = { border: '3px solid rgb(6, 240, 15)' };
    const wrongStyle = { border: '3px solid rgb(255, 0, 0)' };
    this.setState({
      border: { correctStyle, wrongStyle },
      next: {},
    });
  }

  arrayAnswersButtons() {
    const { trivia, index, border, teste, next } = this.state;
    const { timer } = this.props;
    const teste2 = timer > 0;
    let newArray = this.arrayAnswers(trivia[index]);
    newArray = newArray
      .map((element, indic) => (indic < newArray.length - 1 ? (
        <button
          type="button"
          data-testid={ `wrong-answer-${indic}` }
          onClick={ this.addBorder }
          style={ border.wrongStyle }
          disabled={ !teste2 }
        >
          {element}
        </button>)
        : (
          <button
            type="button"
            data-testid="correct-answer"
            onClick={ this.addBorder }
            style={ border.correctStyle }
            disabled={ !teste2 }
          >
            {element}
          </button>)));
    if (teste) {
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
};

// const mapDispatchToProps = (dispatch) => ({
//   addTimer: (timer) => dispatch(getTimer(timer)),
// });

const mapStateToProps = (state) => ({
  name: state.reducer.name,
  image: state.reducer.image,
  token: state.reducer.token,
  endpoint: state.reducer.endpoint,
  timer: state.reducer.timer,
});

export default connect(mapStateToProps)(Game);
