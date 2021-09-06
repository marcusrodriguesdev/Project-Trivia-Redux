import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestQuestionsThunk } from '../redux/actions';
import Header from '../components/Header';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      clicked: false,
      timer: 30,
      disabled: false,
    };
    this.handleQuestions = this.handleQuestions.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.handleQuestions();
    this.timer();
  }

  async handleQuestions() {
    const { getQuestions, token } = this.props;
    // console.log(token);
    const data = await getQuestions(token);
    console.log(data);
    this.setState({
      loading: false,
    });
  }

  checkAnswer({ target }) {
    const { value } = target;
    const { timer } = this.state;
    const { questions: { results } } = this.props;
    const correctAnswer = results[0].correct_answer;
    const questionDifficulty = results[0].difficulty;
    const TEN_POINTS = 10;

    const difficulties = {
      hard: 3,
      medium: 2,
      easy: 1,
    };

    let score = 0;

    if (correctAnswer === value) {
      score += TEN_POINTS + (timer * difficulties[questionDifficulty]);
    }

    console.log(score);

    this.setState({
      clicked: true,
    });
  }

  timer() {
    const ONE_SECOND = 1000;

    setInterval(() => {
      this.setState((previous) => ({
        timer: previous.timer - 1,
      }));
    }, ONE_SECOND);
  }

  render() {
    const { loading, clicked, timer, disabled } = this.state;
    const { questions: { results } } = this.props;

    if (loading) return <h1>Carregando jogo</h1>;
    return (
      <>
        <Header />
        <span>{timer}</span>
        <span data-testid="question-category">{ results[0].category }</span>
        <span data-testid="question-text">
          { results[0].question }
        </span>
        <button
          type="button"
          className={ clicked ? 'correct-answer' : null }
          value={ results[0].correct_answer }
          data-testid="correct-answer"
          onClick={ this.checkAnswer }
          disabled={ timer < 1 ? true : disabled }
        >
          { results[0].correct_answer }
        </button>
        {results[0].incorrect_answers
          .map((answer, index) => (
            <button
              type="button"
              className={ clicked ? 'incorrect-answer' : null }
              key={ index }
              value={ answer }
              data-testid={ `wrong-answer-${index}` }
              onClick={ this.checkAnswer }
              disabled={ timer < 1 ? true : disabled }
            >
              {answer}
            </button>))}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(requestQuestionsThunk(token)),
});

const mapStateToProps = (state) => ({
  token: state.token.token,
  questions: state.questionsReducer.questions,
});

Game.propTypes = {
  token: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  getQuestions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
