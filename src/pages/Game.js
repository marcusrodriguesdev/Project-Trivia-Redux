import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
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
      indexQuestion: 0,

    };
    this.handleQuestions = this.handleQuestions.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.timer = this.timer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.createRanking = this.createRanking.bind(this);
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
    console.log(token);
    const { loading } = this.state;
    const data = await getQuestions(token);
    // ref https://trybecourse.slack.com/archives/C0219LZPB9N/p1631125450081800 (três estava quebrando no teste)
    if (loading && data === undefined) {
      return loading;
    }
    this.setState({
      loading: false,
    });
  }

  checkAnswer({ target }) {
    const { value } = target;
    const { timer, indexQuestion } = this.state;
    const { questions: { results } } = this.props;
    const correctAnswer = results[indexQuestion].correct_answer;
    const questionDifficulty = results[indexQuestion].difficulty;
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

  createRanking() {
    const rankingKey = localStorage.key(2);
    if (!rankingKey) localStorage.setItem('ranking', JSON.stringify([]));
    const { user: { email } } = this.props;
    const userImg = md5(email).toString();
    const player = JSON.parse(localStorage.getItem('state'));
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const novoRanking = [
      ...ranking, { name: player.player.name,
        score: player.player.score,
        picture: userImg },
    ];

    localStorage.setItem('ranking', JSON.stringify(novoRanking));
  }

  nextQuestion() {
    const { history } = this.props;
    const { indexQuestion } = this.state;
    const LAST_QUESTION = 4;

    this.setState((previous) => ({
      indexQuestion: previous.indexQuestion + 1,
    }));

    this.setState({
      clicked: false,
      hidden: true,
      timer: 30,
    });

    if (indexQuestion === LAST_QUESTION) {
      history.push('/feedback');
      this.createRanking();
    }
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
    const { loading,
      clicked, timer, disabled, hidden, indexQuestion, score } = this.state;
    const { questions: { results } } = this.props;
    if (loading) return <h1 className="loading">Carregando jogo...</h1>;
    return (
      <div className="game">
        <Header score={ score } />
        <p className="timer">{timer}</p>
        <p className="question" data-testid="question-category">{ results[indexQuestion].category }</p>
        <p className="question" data-testid="question-text">
          { results[indexQuestion].question }
        </p>
        <div className="options">
          <button
            type="button"
            className={ clicked ? 'correct-answer' : null }
            value={ results[indexQuestion].correct_answer }
            data-testid="correct-answer"
            onClick={ this.checkAnswer }
            disabled={ timer < 1 ? true : disabled }
          >
            { results[indexQuestion].correct_answer }
          </button>
          {results[indexQuestion].incorrect_answers
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
        </div>
        <button
          className="next-question"
          type="button"
          data-testid="btn-next"
          hidden={ hidden }
          onClick={ this.nextQuestion }
        >
          Próxima
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(requestQuestionsThunk(token)),
});

const mapStateToProps = (state) => ({
  user: state.reducerLogin.user,
  token: state.token.token.token,
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
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
