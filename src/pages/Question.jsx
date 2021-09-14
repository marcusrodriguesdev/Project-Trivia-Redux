import React from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { playerPoints } from '../actions';
import CreateNewQuestion from './CreateNewQuestion';

const trivialink = 'https://opentdb.com/api.php?amount=5&token=';
const idIncorrect = '#incorreta';
const tres = 3;
const cinco = 5;
const dez = 10;
const time = 30;
let timer = time;

class Question extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: {
        results: [
          {
            correct_answer: '',
            incorrect_answers: [],
          },
        ],
      },
      assertion: 0,
      pontos: 0,
      nextQuestion: false,
      countQuestion: 0,
      loading: true,
    };

    this.getTriviaApiResponse = this.getTriviaApiResponse.bind(this);
    this.borderColor = this.borderColor.bind(this);
    this.calculatedPoints = this.calculatedPoints.bind(this);
  }

  componentDidMount() {
    this.getTriviaApiResponse();
    this.timeToRespond();
  }

  componentDidUpdate() {
    const { countQuestion } = this.state;
    if (countQuestion === cinco) {
      timer = '';
      return <Redirect to="/feedback" />;
    }
    document.querySelectorAll(idIncorrect).forEach((button) => {
      button.classList.remove('red-border');
      button.disabled = false;
    });
    document.getElementById('correta').classList.remove('green-border');
    document.getElementById('correta').disabled = false;
    timer = time;
  }

  async getTriviaApiResponse() {
    const { countQuestion } = this.state;
    const token = localStorage.getItem('token');
    const responseApi = await fetch(`${trivialink}${token}`);
    const object = await responseApi.json();
    this.setState({
      questions: object,
      difficulty: object.results[countQuestion].difficulty,
      loading: false,
    });
  }

  questionNext() {
    let { countQuestion } = this.state;
    return (
      <button
        className="botao-proxima"
        type="button"
        data-testid="btn-next"
        onClick={ () => {
          this.setState({
            countQuestion: (countQuestion += 1),
            nextQuestion: false,
          });
        } }
      >
        Próxima
      </button>
    );
  }

  borderColor({ target }) {
    this.setState({ nextQuestion: true }, () => {
      document.querySelectorAll(idIncorrect).forEach((button) => {
        button.classList.add('red-border');
      });
      document.getElementById('correta').classList.add('green-border');
    });
    this.calculatedPoints(target);
  }

  timeToRespond() {
    const ONE_SECOND = 1000;
    setInterval(() => {
      if (timer === 0) {
        document.querySelectorAll(idIncorrect).forEach((button) => {
          button.disabled = true;
        });
        document.getElementById('correta').disabled = true;
        this.questionNext();
      }
      timer -= 1;
    }, ONE_SECOND);
  }

  calculatedPoints(target) {
    let { assertion, pontos } = this.state;
    const { submitPlayerPoints } = this.props;
    if (target.id === 'correta') {
      const { difficulty } = this.state;
      let difficultyValue = 0;
      switch (difficulty) {
      case 'easy':
        difficultyValue = 1;
        break;
      case 'medium':
        difficultyValue = 2;
        break;
      case 'hard':
        difficultyValue = tres;
        break;
      default:
        break;
      }
      this.setState({
        pontos: (pontos += dez + timer * difficultyValue),
        assertion: (assertion += 1),
      });
    }
    submitPlayerPoints({ pontos, assertion });
    const { name, gravatarEmail } = this.props;
    localStorage.setItem(
      'state',
      JSON.stringify({
        player: {
          name,
          score: pontos,
          assertions: assertion,
          gravatarEmail,
        },
      }),
    );
  }

  render() {
    const { borderColor } = this;
    const { questions, loading, countQuestion, nextQuestion } = this.state;

    if (loading) return <h1>Loading...</h1>;
    if (countQuestion === cinco) {
      const { name, gravatarEmail, score, assertions } = this.props;
      localStorage.setItem(
        'state',
        JSON.stringify({
          player: {
            name,
            score,
            assertions,
            gravatarEmail,
          },
        }),
      );
      return <Redirect to="/feedback" />;
    }

    return (
      <div>
        <CreateNewQuestion
          questions={ questions }
          countQuestion={ countQuestion }
          borderColor={ borderColor }
        />
        {nextQuestion ? this.questionNext() : ''}
      </div>
    );
  }
}

Question.propTypes = {
  submitPlayerPoints: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.email,
  score: state.player.score,
  assertions: state.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  submitPlayerPoints: (payload) => dispatch(playerPoints(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
