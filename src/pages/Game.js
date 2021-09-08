import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestQuestionsThunk } from '../redux/actions';
import Header from '../components/Header';

class Game extends React.Component {
  constructor(props) {
    super(props);
    const { user } = this.props;
    this.state = {
      loading: true,
      clicked: false,
      timer: 30,
      disabled: false,
      name: user.nome,
      assertions: 0,
      score: user.score,
      gravatarEmail: user.email,
      hidden: true,

    };
    this.handleQuestions = this.handleQuestions.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.handleQuestions();
    this.timer();
  }

  componentDidUpdate() {
    const { name, assertions, score, gravatarEmail } = this.state;
    const state = {
      player: {
        name,
        assertions,
        score,
        gravatarEmail,
      },
    };

    localStorage.setItem('state', JSON.stringify(state));
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

    if (correctAnswer === value) {
      this.setState((previous) => ({
        score: previous.score + TEN_POINTS + (timer * difficulties[questionDifficulty]),
        assertions: previous.assertions + 1,
      }));
    }

    this.setState({
      clicked: true,
      hidden: false,
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
    const { loading, clicked, timer, disabled, hidden } = this.state;
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

        <button
          type="button"
          data-testid="btn-next"
          hidden={ hidden }
        >
          Próxima
        </button>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(requestQuestionsThunk(token)),
});

const mapStateToProps = (state) => ({
  user: state.reducerLogin.user,
  token: state.token.token,
  questions: state.questionsReducer.questions,
});

Game.propTypes = {
  token: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  getQuestions: PropTypes.func.isRequired,
  user: PropTypes.shape({
    nome: PropTypes.string,
    assertions: PropTypes.number,
    score: PropTypes.number,
    email: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
