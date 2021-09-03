import React, { Component } from 'react';
import '../App.css';

class game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
      timer: 30,
      answers: [],
    };

    this.fetchAPI = this.fetchAPI.bind(this);
  }

  componentDidMount() {
    this.fetchAPI();
    const miliseconds = 1000;
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, miliseconds);
  }

  componentDidUpdate(prevProps, prevState) {
    this.setTimerLimit(prevState);
  }

  setTimerLimit(prevState) {
    const timeLimit = 0;
    if (prevState.timer === timeLimit) {
      this.setState({ timer: 0 });
    }
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
    const { data, answers, timer } = this.state;
    const loading = <div className="loading">Loading</div>;

    if (data === '' || answers === []) {
      return loading;
    }
    return (
      <div className="App">
        Tela do jogo
        <div className="question-board">
          <h1 data-testid="question-category">{data.category}</h1>
          <h2 data-testid="question-text">{data.question}</h2>
          {answers
            .map(((answer, index) => (
              <button
                type="button"
                data-testid={ `wrong-answer${index}` }
                key={ index }
                disabled={ timer === 0 }
              >
                { answer }
              </button>
            )))}
          <button
            type="button"
            data-testid="correct-answer"
            disabled={ timer === 0 }
          >
            {data.correct_answer}
          </button>
          <div>
            { timer }
          </div>
        </div>
      </div>
    );
  }
}

export default game;
