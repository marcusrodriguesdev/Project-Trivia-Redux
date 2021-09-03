import React, { Component } from 'react';
import '../App.css';
import HeaderInfo from '../components/HeaderInfo';

class game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
    };

    this.fetchAPI = this.fetchAPI.bind(this);
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

  render() {
    const { data } = this.state;
    const loading = <div className="loading">Loading...</div>;

    if (data === '') {
      return loading;
    }
    return (
      <div className="App">
        <HeaderInfo />
        Tela de jogo
        <div className="question-board">
          <h1 data-testid="question-category">{data.category}</h1>
          <h2 data-testid="question-text">{data.question}</h2>
          {data.incorrect_answers
            .map(((answer, index) => (
              <button
                type="button"
                data-testid={ `wrong-answer${index}` }
                key={ index }
              >
                { answer }
              </button>
            )))}
          <button
            type="button"
            data-testid="correct-answer"
          >
            {data.correct_answer}
          </button>
        </div>
      </div>
    );
  }
}

export default game;
