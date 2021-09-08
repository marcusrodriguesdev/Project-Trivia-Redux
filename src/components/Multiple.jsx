import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ONE_SECOND = 1000;

class Multiple extends Component {
  constructor() {
    super();
    this.state = {
      correct: null,
      incorrect: null,
      chronometer: 30,
      isEnabled: true,
    };
    this.clickClassName = this.clickClassName.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.updateIsEnabled = this.updateIsEnabled.bind(this);
  }

  componentDidMount() {
    this.chronometerId = setInterval(() => {
      const { chronometer, isEnabled } = this.state;
      if (chronometer > 0 && isEnabled) {
        this.setState((prevState) => ({ chronometer: prevState.chronometer - 1 }));
      }
      // console.log('intervalo');
    }, ONE_SECOND);
  }

  componentDidUpdate() {
    const { chronometer, isEnabled } = this.state;
    if (isEnabled && chronometer === 0) {
      this.updateIsEnabled();
      // clearInterval(this.chronometerId);
    }
  }

  componentWillUnmount() {
    clearInterval(this.chronometerId);
  }

  updateIsEnabled() {
    this.setState({
      isEnabled: false,
    });
  }

  clickClassName(answer) {
    const { chronometer } = this.state;
    const { endRound } = this.props;
    this.setState({ incorrect: 'incorrect', correct: 'correct' });
    endRound(answer, chronometer);
    this.updateIsEnabled();
    // clearInterval(this.chronometerId);
  }

  nextButton() {
    const { nextRound } = this.props;
    const { isEnabled } = this.state;
    if (!isEnabled) {
      return (
        <button
          data-testid="btn-next"
          type="button"
          onClick={ () => {
            this.setState({
              chronometer: 30,
              isEnabled: true,
            });
            nextRound();
            this.setState({ incorrect: null, correct: null });
          } }
        >
          Próxima
        </button>
      );
    }
  }

  renderAnswerButton(answer) {
    const { correct, incorrect, isEnabled } = this.state;
    const ONE_NEGATIVE = -1;
    return (answer.index === ONE_NEGATIVE)
      ? (
        <button
          type="button"
          data-testid="correct-answer"
          disabled={ !isEnabled }
          className={ correct }
          onClick={ () => this.clickClassName('correct') }
        >
          { answer.answer }
        </button>)
      : (
        <button
          type="button"
          data-testid={ `wrong-answer-${answer.index}` }
          disabled={ !isEnabled }
          className={ incorrect }
          onClick={ () => this.clickClassName('incorrect') }
        >
          { answer.answer }
        </button>);
  }

  render() {
    const { chronometer } = this.state;
    const { currentQuestion, category, question } = this.props;
    return (
      <div>
        <h1>
          { chronometer }
        </h1>
        <p>
          Categoria:
          <span data-testid="question-category">{ category }</span>
        </p>
        <p>
          Pergunta:
          <span data-testid="question-text">{ question }</span>
        </p>
        <div>
          {this.renderAnswerButton(currentQuestion[0])}
          {this.renderAnswerButton(currentQuestion[1])}
          {this.renderAnswerButton(currentQuestion[2])}
          {this.renderAnswerButton(currentQuestion[3])}
        </div>
        { this.nextButton() }
      </div>
    );
  }
}
// precisa saber se a resposta clicada foi a certa
// alterar o estado correspondente
// usar esse estado para mostrar/nao o nextButton

Multiple.propTypes = {
  category: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  currentQuestion: PropTypes.arrayOf({}).isRequired,
  endRound: PropTypes.func.isRequired,
  nextRound: PropTypes.func.isRequired,
};

export default Multiple;
