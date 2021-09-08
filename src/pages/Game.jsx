import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchTrivia from '../services/fetchTrivia';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trivia: [],
      index: 0,
      isLoading: true,
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
    });
  }

  arrayAnswersButtons() {
    const { trivia, index, border, teste } = this.state;
    // console.log(trivia[index]);
    let newArray = this.arrayAnswers(trivia[index]);
    // console.log(newArray);
    newArray = newArray
      .map((element, indic) => (indic < newArray.length - 1 ? (
        <button
          type="button"
          data-testid={ `wrong-answer-${indic}` }
          onClick={ this.addBorder }
          style={ border.wrongStyle }
        >
          {element}
        </button>)
        : (
          <button
            type="button"
            data-testid="correct-answer"
            onClick={ this.addBorder }
            style={ border.correctStyle }
          >
            {element}
          </button>)));
    // console.log(newArray);
    if (teste) {
      this.randomizeAnswers(newArray);
      this.setState({
        teste: false,
      });
    }
    // console.log(randomArray);

    return (
      <div>
        <p data-testid="question-category">{trivia[index].category}</p>
        <p data-testid="question-text">{trivia[index].question}</p>
        { newArray.map((element, ordem) => <span key={ ordem }>{element}</span>)}
        <button
          type="button"
          onClick={ this.nextButton }
          data-testid="btn-next"
        >
          Próxima
        </button>
      </div>
    );
  }

  render() {
    const { name, image } = this.props;
    const { isLoading } = this.state;
    return (
      <>
        <header>
          <img src={ image } alt="user" data-testid="header-profile-picture" />
          <p data-testid="header-player-name">{name}</p>
          <p data-testid="header-score">Placar: 0</p>
        </header>
        <section>
          { isLoading ? <p>Loading...</p> : this.arrayAnswersButtons() }
        </section>
      </>
    );
  }
}

Game.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.reducer.name,
  image: state.reducer.image,
  token: state.reducer.token,
  endpoint: state.reducer.endpoint,
});

export default connect(mapStateToProps)(Game);
