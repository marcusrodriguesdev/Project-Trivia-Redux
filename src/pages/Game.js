import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      timer: 30,
      questionNumber: 0,
      PlayerScore: 0,
      PlayerAssertions: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.setTimer = this.setTimer.bind(this);
  }

  componentDidMount() {
    this.setTimer();
    this.updateLocalStorage();
  }

  componentWillUnmount() {
    const playerInfo = JSON.parse(localStorage.getItem('state'));

    const player = {
      name: playerInfo.player.name,
      score: playerInfo.player.score,
      picture: playerInfo.player.picture,
    };

    const getRanking = JSON.parse(localStorage.getItem('ranking'));
    if (getRanking) {
      localStorage.setItem('ranking', JSON.stringify([...getRanking, player]));
    } else localStorage.setItem('ranking', JSON.stringify([player]));
  }

  setTimer() {
    const ONE_SECOND = 1000;
    this.setState({ timer: 30 });
    const countdown = setInterval(() => {
      this.setState(
        (prevState) => ({
          timer: prevState.timer - 1,
        }),
        () => {
          const { timer, clicked } = this.state;
          if (timer <= 0 || clicked) {
            clearInterval(countdown);
            this.setState({ clicked: true });
          }
        },
      );
    }, ONE_SECOND);
  }

  handleClick({ target }) {
    const { timer, questionNumber } = this.state;
    const { questions } = this.props;
    const { difficulty } = questions[questionNumber];
    const baseScore = 10;

    const obj = {
      easy: 1,
      medium: 2,
      hard: 3,
    };

    if (target.name === 'correct-answer') {
      this.setState((prevstate) => ({
        PlayerScore:
          prevstate.PlayerScore + baseScore + timer * obj[difficulty],
        PlayerAssertions: prevstate.PlayerAssertions + 1,
      }));
    }

    this.setState(
      {
        clicked: true,
      },
      () => {
        this.updateLocalStorage();
      },
    );
  }

  updateLocalStorage() {
    const { PlayerAssertions, PlayerScore } = this.state;
    const { player } = this.props;

    const localStorageObj = {
      player: {
        name: player.nome,
        assertions: PlayerAssertions,
        score: PlayerScore,
        gravatarEmail: player.email,
        picture: player.avatar,
      },
    };

    localStorage.setItem('state', JSON.stringify(localStorageObj));
  }

  randomAnswers(questions) {
    const { questionNumber, clicked } = this.state;
    const allQuestions = [
      questions[questionNumber].correct_answer,
      ...questions[questionNumber].incorrect_answers,
    ].sort();
    return (
      <ul>
        {allQuestions.map((question, index) => {
          if (question === questions[questionNumber].correct_answer) {
            return (
              <button
                type="button"
                onClick={ this.handleClick }
                data-testid="correct-answer"
                disabled={ clicked }
                id="correct"
                className={ clicked ? 'green-border' : '' }
                name="correct-answer"
              >
                {decodeURIComponent(question)}
              </button>
            );
          }
          return (
            <button
              type="button"
              disabled={ clicked }
              id={ index }
              className={ clicked ? 'red-border' : '' }
              name="wrong-answer"
              key={ index }
              data-testid={ `wrong-answer-${index}` }
              onClick={ this.handleClick }
            >
              {decodeURIComponent(question)}
            </button>
          );
        })}
      </ul>
    );
  }

  nextButton(questionNumber) {
    const { history, questions } = this.props;
    if (questionNumber < questions.length - 1) {
      this.setState(
        (prevState) => ({
          questionNumber: prevState.questionNumber + 1,
          clicked: false,
        }),
        () => {
          this.setTimer();
        },
      );
    } else {
      history.push('/feedback');
    }
  }

  render() {
    const { player, questions } = this.props;
    const { timer, questionNumber, PlayerScore, clicked } = this.state;
    return (
      <div>
        <p>{timer}</p>
        <header>
          <img
            alt="avatar"
            data-testid="header-profile-picture"
            src={ player.avatar }
          />
          <h4 data-testid="header-player-name">
            Nome:
            {player.nome}
            {' '}
            <span data-testid="header-score">
              Score:
              {PlayerScore}
            </span>
          </h4>
        </header>
        <div>
          <p data-testid="question-category">
            Category:
            {decodeURIComponent(questions[questionNumber].category)}
          </p>
          <h3 data-testid="question-text">
            {decodeURIComponent(questions[questionNumber].question)}
          </h3>
          {this.randomAnswers(questions)}
        </div>
        {clicked && (
          <input
            type="button"
            data-testid="btn-next"
            onClick={ () => this.nextButton(questionNumber) }
            value="Próxima"
          />
        )}
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  player: PropTypes.shape({
    avatar: PropTypes.string,
    email: PropTypes.string,
    nome: PropTypes.string,
  }).isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.user.questions,
  player: state.user.player,
});

export default connect(mapStateToProps)(Game);
