import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shuffleList from '../../services/suffleList';
import './Question.css';
import { setTimer } from '../../redux/actions';

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

  handleClick({ target }) {
    const { correctAnswer } = this.props;
    const AllButtons = document.querySelectorAll('button');
    AllButtons.forEach((button) => (correctAnswer === button.innerText
      ? button.classList.add('answer-correct')
      : button.classList.add('answer-wrong')));
    if (target.innerText === correctAnswer) { this.calcPonts(); }
  }

  calcPonts() {
    const { difficulty } = this.props;
    const timer = document.querySelector('#timer').innerHTML;
    const pontDifficulty = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    const TEN_NUMBER = 10;
    const total = TEN_NUMBER + (timer * pontDifficulty[difficulty]);
    const stateLocal = JSON.parse(localStorage.getItem('state'));
    const newLocal = { ...stateLocal, player: { ...stateLocal.player, score: total } };
    localStorage.setItem('state', JSON.stringify(newLocal));
    console.log(Object.keys(localStorage));
  }

  render() {
    const { isTimer, category, question, correctAnswer, incorrectAnswers } = this.props;
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
                disabled={ isTimer }
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
              disabled={ isTimer }
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
  isTimer: PropTypes.bool.isRequired,
  difficulty: PropTypes.string.isRequired,
  incorrectAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const MapStateToProps = (state) => ({
  isTimer: state.game.stopWatch.isTimer,
});

const MapDispachToProps = (dispatch) => ({

  setTimeGlobal: (payload) => dispatch(setTimer(payload)),
});

export default connect(MapStateToProps, MapDispachToProps)(Question);
