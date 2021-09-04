import React, { Component } from 'react';
import '../App.css';
<<<<<<< HEAD
import '../gameButton.css';
=======
import HeaderInfo from '../components/HeaderInfo';
>>>>>>> 14f2d38b273365d84066c82abe52f7c7ca3badca

class game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
<<<<<<< HEAD
      paintInput: false,
=======
      timer: 30,
      answers: [],
>>>>>>> 14f2d38b273365d84066c82abe52f7c7ca3badca
    };

    this.fetchAPI = this.fetchAPI.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  handleClick() {
    this.setState({
      paintInput: true,
    });
  }

  render() {
<<<<<<< HEAD
    const { data, paintInput } = this.state;
    const loading = <div className="loading">Loading...</div>;
=======
    const { data, answers, timer } = this.state;
    const loading = <div className="loading">Loading</div>;
>>>>>>> 14f2d38b273365d84066c82abe52f7c7ca3badca

    if (data === '' || answers === []) {
      return loading;
    }
    return (
      <div className="App">
        <HeaderInfo />
        Tela de jogo
        <div className={ paintInput ? 'show' : 'question-board' }>
          <h1 data-testid="question-category">{data.category}</h1>
          <h2 data-testid="question-text">{data.question}</h2>
          {answers
            .map(((answer, index) => (
              <button
                type="button"
                className="wrong"
                data-testid={ `wrong-answer${index}` }
                key={ index }
<<<<<<< HEAD
                onClick={ this.handleClick }
=======
                disabled={ timer === 0 }
>>>>>>> 14f2d38b273365d84066c82abe52f7c7ca3badca
              >
                {answer}
              </button>
            )))}
          <button
            type="button"
            className="correct"
            data-testid="correct-answer"
<<<<<<< HEAD
            onClick={ this.handleClick }
=======
            disabled={ timer === 0 }
>>>>>>> 14f2d38b273365d84066c82abe52f7c7ca3badca
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
