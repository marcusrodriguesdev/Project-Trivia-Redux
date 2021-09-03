import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './Questions.css';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      correct: null,
      incorrect: null,
      seconds: 30,
      disable: false,
    };
    this.handleClickClassName = this.handleClickClassName.bind(this);
    this.rulesOfUpdate = this.rulesOfUpdate.bind(this);
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.intervalId = setInterval(() => {
      this.setState((estadoAnterior) => ({ seconds: estadoAnterior.seconds - 1 }));
    }, ONE_SECOND);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.seconds === 0) {
      this.rulesOfUpdate();
    }
  }

  rulesOfUpdate() {
    this.setState({
      seconds: 0,
      incorrect: 'incorrect',
      correct: 'correct',
      disable: true });
  }

  handleClickClassName() {
    this.setState({ incorrect: 'incorrect', correct: 'correct' });
  }

  render() {
    const { correct, incorrect, seconds, disable } = this.state;
    const { resp } = this.props;
    return (
      <div>
        <seconds>{seconds}</seconds>
        <p data-testid="question-category">{resp[0].category}</p>
        <p data-testid="question-text">{resp[0].question}</p>
        <button
          className={ correct }
          onClick={ this.handleClickClassName }
          data-testid="correct-answer"
          type="button"
          disabled={ disable }
        >
          {resp[0].correct_answer}
        </button>
        {resp[0].incorrect_answers
          .map((element, index) => (
            <div key={ index }>
              <button
                className={ incorrect }
                onClick={ this.handleClickClassName }
                type="button"
                key={ index }
                data-testid={ `wrong-answer-${index}` }
                disabled={ disable }
              >
                {element}
              </button>
            </div>
          ))}
      </div>
    );
  }
}

Questions.propTypes = {
  resp: PropTypes.string.isRequired,
};

export default Questions;
