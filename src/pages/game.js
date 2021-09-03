import React, { Component } from 'react';
import '../App.css';
import HeaderInfo from '../components/HeaderInfo';

class game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
      answers: [],
    };

    this.fetchAPI = this.fetchAPI.bind(this);
  }

  componentDidMount() {
    this.fetchAPI();
  }

  async fetchAPI() {
    const response = await fetch('https://opentdb.com/api.php?amount=5');
    const data = await response.json();

    const incorrectAnswers = data.results[0].incorrect_answers;
    const correctAswer = data.results[0].correct_answer;
    const allAnswers = [...incorrectAnswers, correctAswer];

    this.setState({
      data: data.results[0],
      answers: allAnswers.sort(),
    });
    return data;
  }

  render() {
    const { data, answers } = this.state;
    const loading = <div className="loading">Loading</div>;

    if (data === '' || answers === []) {
      return loading;
    }
    return (
      <div className="App">
        <HeaderInfo />
        Tela de jogo
        <div className="question-board">
          <h1 data-testid="question-category">{data.category}</h1>
          <h2 data-testid="question-text">{data.question}</h2>
          {answers.map((answer, index) => (
            answer === data.correct_answer
              ? (
                <button
                  key={ index }
                  type="button"
                  data-testid="correct-answer"
                >
                  { answer }
                </button>
              )
              : (
                <button
                  key={ index }
                  type="button"
                  data-testid={ `wrong-answer${index}` }
                >
                  { answer }
                </button>
              )
          ))}
        </div>
      </div>
    );
  }
}

export default game;
