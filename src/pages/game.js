import React, { Component } from 'react';
import '../App.css';
import '../gameButton.css';

class game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
      paintInput: false,
    };

    this.fetchAPI = this.fetchAPI.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.fetchAPI();
  }

  async fetchAPI() {
    const response = await fetch('https://opentdb.com/api.php?amount=5');
    const data = await response.json();
    this.setState({
      data: data.results[0],
    });
    return data;
  }

  handleClick() {
    this.setState({
      paintInput: true,
    });
  }

  render() {
    const { data, paintInput } = this.state;
    const loading = <div className="loading">Loading...</div>;

    if (data === '') {
      return loading;
    }
    return (
      <div className="App">
        Tela de jogo
        <div className={ paintInput ? 'show' : 'question-board' }>
          <h1 data-testid="question-category">{data.category}</h1>
          <h2 data-testid="question-text">{data.question}</h2>
          {data.incorrect_answers
            .map(((answer, index) => (
              <button
                type="button"
                className="wrong"
                data-testid={ `wrong-answer${index}` }
                key={ index }
                onClick={ this.handleClick }
              >
                {answer}
              </button>
            )))}
          <button
            type="button"
            className="correct"
            data-testid="correct-answer"
            onClick={ this.handleClick }
          >
            {data.correct_answer}
          </button>
        </div>
      </div>
    );
  }
}

export default game;
