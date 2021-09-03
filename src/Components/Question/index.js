import React from 'react';
import PropTypes from 'prop-types';
import shuffleList from '../../services/suffleList';
import './Question.css';

class Question extends React.Component {
  constructor(props) {
    super(props);
    const { correctAnswer } = this.props;
    this.state = {
      correctAnswerIdentifier: correctAnswer,
    };
    this.handleClick = this.handleClick.bind(this);
    this.calcPonts = this.calcPonts.bind(this);
  }

  handleClick({ target: { dataset: { testid } } }) {
    const AllButtons = document.querySelectorAll('button');
    AllButtons.forEach((button) => {
      const { dataset: { testid } } = button;
      return testid === 'correct-answer'
        ? button.classList.add('answer-correct')
        : button.classList.add('answer-wrong');
    });
    if (testid === 'correct-answer') { this.calcPonts(); }
  }

  calcPonts() {
    const { difficulty } = this.props;
    const pontDifficulty = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    // // Para terminar a implementação desse requisito é necesssario o timer
    // const total = 10 + (timer * pontDifficulty[difficulty]);
  }

  render() {
    const { category, question, correctAnswer, incorrectAnswers } = this.props;
    const answerList = [correctAnswer, ...incorrectAnswers];
    const shuffledList = shuffleList(answerList);
    const { correctAnswerIdentifier } = this.state;
    return (
      <div>
        <div data-testid="question-category">
          Categoria:
          { category }
        </div>
        <div data-testid="question-text">
          Pergunta:
          { question }
        </div>
        { shuffledList.map((element) => {
          if (element === correctAnswerIdentifier) {
            return (
              <button
                onClick={ this.handleClick }
                type="button"
                data-testid="correct-answer"
                key={ element }
              >
                {element}
              </button>
            );
          }
          return (
            <button
              onClick={ this.handleClick }
              type="button"
              data-testid="wrong-answer"
              key={ element }
            >
              {element}
            </button>
          );
        }) }
      </div>
    );
  }
}

Question.propTypes = {
  category: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  incorrectAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Question;
