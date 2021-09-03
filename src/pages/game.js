import React, { Component } from 'react';

class game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
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
    return (
      <div className="App">
        Tela de jogo
        <div className="question-board">
          <h1 data-testid="question-category">{data.category}</h1>
          <h2 data-testid="question-text">{data.question}</h2>
          <h3>{data.incorrect_answers}</h3>
          {/* <ol>
            {data.incorrect_answers
              .map(((answer, index) => (
                <li key={ index }>
                  <button
                    type="button"
                    data-testid={ `wrong-answer${index}` }
                  >
                    { answer }
                  </button>
                </li>
              )))}
          </ol> */}
        </div>
      </div>
    );
  }
}

export default game;
