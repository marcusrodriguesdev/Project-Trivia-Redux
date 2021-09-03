import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setLocalStorageThunk, setScore as setScoreAction } from '../actions';

import '../App.css';

class game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
      timer: 0,
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

  handleCorrectAnswer(difficulty) {
    const DEFAULT_POINTS = 10;
    const { timer } = this.state;
    const { setScore, setLocalStorage } = this.props;
    const difficultyPoints = {
      easy: 1,
      medium: 2,
      hard: 3,
    };

    const earnedPoints = DEFAULT_POINTS + (difficultyPoints[difficulty] * timer);

    setScore(earnedPoints);
    setLocalStorage();
  }

  render() {
    const { data } = this.state;
    const loading = <div className="loading">Loading...</div>;

    if (data === '') {
      return loading;
    }
    return (
      <div className="App">
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
            onClick={ () => this.handleCorrectAnswer(data.difficulty) }
          >
            {data.correct_answer}
          </button>
        </div>
      </div>
    );
  }
}

game.propTypes = {
  setScore: PropTypes.func.isRequired,
  setLocalStorage: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispath) => ({
  setScore: (score) => dispath(setScoreAction(score)),
  setLocalStorage: () => dispath(setLocalStorageThunk()),
});

export default connect(null, mapDispatchToProps)(game);
