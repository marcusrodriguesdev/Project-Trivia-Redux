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
    };

    this.fetchTriviaGame = this.fetchTriviaGame.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.teste = this.teste.bind(this);
    this.teste2 = this.teste2.bind(this);
    this.teste3 = this.teste3.bind(this);
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
      });
    }
  }

  teste2({ incorrect_answers: incorrectAnswers, correct_answer: correctAnswer }) {
    const allAnswers = [...incorrectAnswers, correctAnswer];
    return allAnswers;
  }

  teste3(array) {
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

  teste() {
    const { trivia, index } = this.state;
    console.log(trivia[index]);
    let newArray = this.teste2(trivia[index]);
    // console.log(newArray);
    newArray = newArray
      .map((element, indic) => (indic < newArray.length - 1
        ? <button type="button" data-testid={ `wrong-answer-${indic}` }>{element}</button>
        : <button type="button" data-testid="correct-answer">{element}</button>));
    console.log(newArray);
    this.teste3(newArray);
    // console.log(randomArray);

    return (
      <div>
        <p data-testid="question-category">{trivia[index].category}</p>
        <p data-testid="question-text">{trivia[index].question}</p>
        { newArray.map((element, ordem) => <span key={ ordem }>{element}</span>)}
        <button type="button" onClick={ this.nextButton }>clicar</button>
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
          { isLoading ? <p>Loading...</p> : this.teste() }
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
