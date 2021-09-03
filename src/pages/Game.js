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
  }

  componentDidMount() {
    const { timer } = this.state;
    const ONE_SECOND = 1000;
    if (timer > 0) {
      setInterval(() => (
        this.setState((prevstate) => ({ timer: prevstate.timer - 1 }))
      ), ONE_SECOND);
    }

    // Set localstorage default
    const { PlayerAssertions, PlayerScore } = this.state;
    const { player } = this.props;

    const localStorageObj = {
      player: {
        name: player.nome,
        assertions: PlayerAssertions,
        score: PlayerScore,
        gravatarEmail: player.email,
      },
    };

    localStorage.setItem('state', JSON.stringify(localStorageObj));
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
      this.setState((prevstate) => (
        { PlayerScore: prevstate.PlayerScore + baseScore + (timer * obj[difficulty]),
          PlayerAssertions: prevstate.PlayerAssertions + 1,
        }));
    }

    this.setState({
      clicked: true,
    },
    () => {
      this.updateLocalStorage();
    });
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
      },
    };

    localStorage.setItem('state', JSON.stringify(localStorageObj));
  }

  answersRender(questions) {
    const { clicked, timer, questionNumber } = this.state;
    return (
      <ul>
        <button
          type="button"
          onClick={ this.handleClick }
          data-testid="correct-answer"
          disabled={ timer <= 0 ? true : clicked }
          id="correct"
          className={ clicked ? 'green-border' : '' }
          name="correct-answer"
        >
          {' '}
          {questions[questionNumber].correct_answer}
        </button>
        <br />
        {questions[questionNumber].incorrect_answers.map((answer, index) => (
          <>
            <button
              type="button"
              disabled={ timer <= 0 ? true : clicked }
              id={ index }
              className={ clicked ? 'red-border' : '' }
              name="wrong-answer"
              key={ index }
              data-testid={ `wrong-answer-${index}` }
              onClick={ this.handleClick }
            >
              {answer}
            </button>
            <br />
          </>
        ))}
      </ul>
    );
  }

  render() {
    const { player, questions } = this.props;
    const { timer, questionNumber, PlayerScore } = this.state;
    return (
      <div>
        <p>{ `${timer > 0 ? timer : 0}` }</p>
        <header>
          <img alt="avatar" data-testid="header-profile-picture" src={ player.avatar } />
          <h4 data-testid="header-player-name">
            Nome:
            {player.nome}
            {' '}
            <span data-testid="header-score">
              Score:
              { PlayerScore }
            </span>
          </h4>
        </header>
        <div>
          <p data-testid="question-category">
            Categoria:
            {questions[questionNumber].category}
          </p>
          <h3 data-testid="question-text">
            {questions[questionNumber].question}
          </h3>
          { this.answersRender(questions) }
        </div>
      </div>);
  }
}

Game.propTypes = {
  player: PropTypes.shape({
    avatar: PropTypes.string,
    nome: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.user.questions,
  player: state.user.player,
});

export default connect(mapStateToProps)(Game);
