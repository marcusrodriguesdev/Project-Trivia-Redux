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
      answerList: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.setAnswersList = this.setAnswersList.bind(this);
  }

  componentDidMount() {
    const { correctAnswer, incorrectAnswers } = this.props;
    const answerList = [correctAnswer, ...incorrectAnswers];
    const shuffledList = shuffleList(answerList);
    this.setAnswersList(shuffledList);
  }

  setAnswersList(list) {
    this.setState({
      answerList: list,
    });
  }

  handleClick() {
    const { correctAnswer, answerClick, setTimeGlobal } = this.props;
    const AllButtons = document.querySelectorAll('button');
    AllButtons.forEach((button) => (correctAnswer === button.innerText
      ? button.classList.add('answer-correct')
      : button.classList.add('answer-wrong')));
    answerClick();
    setTimeGlobal(true);
  }

  renderNexButton() {
    const { nextClick, setTimeGlobal } = this.props;
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ () => {
          nextClick();
          setTimeGlobal(false);
        } }
      >
        Próxima
      </button>
    );
  }

  render() {
    const { category, question, isTimer } = this.props;
    const { correctAnswerIdentifier, answerList } = this.state;
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
        { answerList.map((element) => {
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
        { isTimer ? this.renderNexButton() : undefined }
      </div>
    );
  }
}

Question.propTypes = {
  category: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  isTimer: PropTypes.bool.isRequired,
  incorrectAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
  answerClick: PropTypes.func.isRequired,
  nextClick: PropTypes.func.isRequired,
  setTimeGlobal: PropTypes.func.isRequired,
};

const MapStateToProps = (state) => ({
  isTimer: state.game.stopWatch.isTimer,
});

const MapDispachToProps = (dispatch) => ({

  setTimeGlobal: (payload) => dispatch(setTimer(payload)),
});

export default connect(MapStateToProps, MapDispachToProps)(Question);
