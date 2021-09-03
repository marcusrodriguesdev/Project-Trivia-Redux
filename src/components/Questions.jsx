import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import './Questions.css';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      correct: null,
      incorrect: null,
      seconds: 30,
      disable: false,
      numberQuestion: 0,
      visibilit: 'hide',
      redirect: false,
    };
    this.handleClickClassName = this.handleClickClassName.bind(this);
    this.rulesOfUpdate = this.rulesOfUpdate.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
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

  handleClickClassName({ target: { name } }) {
    this.setState({ incorrect: 'incorrect', correct: 'correct' });
    const teste = name;
    console.log(teste);
    if (teste === 'correct' || teste === 'incorrect') {
      this.setState({
        visibilit: 'show',
      });
    }
  }

  nextQuestion() {
    const { numberQuestion } = this.state;
    const question = 4;
    if (numberQuestion === question) {
      this.setState({ redirect: true });
    }
    this.setState((estadoAnterior) => ({
      numberQuestion: estadoAnterior.numberQuestion + 1,
      seconds: 30,
      correct: null,
      incorrect: null,
    }));
  }

  render() {
    // embaralhar questões incorretas/ sort
    const { redirect, correct, incorrect, seconds, disable,
      numberQuestion, visibilit } = this.state;
    const { resp } = this.props;
    if (redirect === true) { return <Redirect to="/feedback" />; }
    return (
      <div>
        <seconds>{seconds}</seconds>
        <p data-testid="question-category">{resp[numberQuestion].category}</p>
        <p data-testid="question-text">{resp[numberQuestion].question}</p>
        <button
          className={ correct }
          name="correct"
          onClick={ this.handleClickClassName }
          data-testid="correct-answer"
          type="button"
          disabled={ disable }
        >
          {resp[numberQuestion].correct_answer}
        </button>
        {resp[numberQuestion].incorrect_answers
          .map((element, index) => (
            <div key={ index }>
              <button
                name="incorrect"
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
        <div>
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.nextQuestion }
            className={ seconds === 0 ? 'show' : visibilit }
          >
            Próxima
          </button>
        </div>
      </div>
    );
  }
}

Questions.propTypes = {
  resp: PropTypes.string.isRequired,
  // numberQuestion: PropTypes.number.isRequired,
};

export default Questions;
