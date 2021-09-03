import React, { Component } from 'react';
import '../App.css';

class game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
      tighten: false,
      id: 0,
    };

    this.fetchAPI = this.fetchAPI.bind(this);
    this.clickingState = this.clickingState.bind(this);
    this.changingId = this.changingId.bind(this);
  }

  componentDidMount() {
    this.fetchAPI();
  }

  async fetchAPI() {
    const response = await fetch('https://opentdb.com/api.php?amount=5');
    const data = await response.json();
    this.setState({
      data: data.results,
    });
    return data;
  }

  clickingState() {
    this.setState({
      tighten: true,
    });
  }

  changingId() {
    const { id, data } = this.state;
    const soma = id + 1;
    if (soma < data.length) {
      this.setState({
        id: soma,
        tighten: false,
      });
    }
  }

  render() {
    const { data, tighten, id } = this.state;
    const loading = <div className="loading">Loading...</div>;
    const buttonNext = (
      <button data-testid="btn-next" type="submit" onClick={ this.changingId }>
        Próximo
      </button>
    );

    if (data === '') {
      return loading;
    }
    return (
      <div className="App">
        Tela de jogo
        <div className="question-board">
          <h1 data-testid="question-category">{data[id].category}</h1>
          <h2 data-testid="question-text">{data[id].question}</h2>
          {data[id].incorrect_answers
            .map(((answer, index) => (
              <button
                type="button"
                data-testid={ `wrong-answer${index}` }
                key={ index }
                onClick={ this.clickingState }
              >
                { answer }
              </button>
            )))}
          <button
            type="button"
            data-testid="correct-answer"
            onClick={ this.clickingState }
          >
            {data[id].correct_answer}
          </button>
          { tighten && buttonNext }
        </div>
      </div>
    );
  }
}

export default game;
