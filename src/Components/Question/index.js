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
  }

  handleClick() {
    const AllButtons = document.querySelectorAll('button');
    AllButtons.forEach((button) => {
      const { dataset: { testid } } = button;
      return testid === 'correct-answer'
        ? button.classList.add('answer-correct')
        : button.classList.add('answer-wrong');
    });
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
