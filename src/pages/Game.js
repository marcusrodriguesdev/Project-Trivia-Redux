import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      timer: 30,
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
  }

  handleClick() {
    this.setState({
      clicked: true,
    });
  }

  answersRender(questions) {
    const { clicked, timer } = this.state;
    return (
      <ul>
        <button
          type="button"
          onClick={ this.handleClick }
          data-testid="correct-answer"
          disabled={ timer <= 0 ? true : clicked }
          id="correct"
          className={ clicked ? 'green-border' : '' }
          name="answer"
        >
          {questions[0].correct_answer}
        </button>
        <br />
        {questions[0].incorrect_answers.map((answer, index) => (
          <>
            <button
              type="button"
              disabled={ timer <= 0 ? true : clicked }
              id={ index }
              className={ clicked ? 'red-border' : '' }
              name="answer"
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
    const { timer } = this.state;
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
              Score: 0
            </span>
          </h4>
        </header>
        <div>
          <p data-testid="question-category">
            Categoria:
            {questions[0].category}
          </p>
          <h3 data-testid="question-text">
            {questions[0].question}
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
  }).isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.user.questions,
  player: state.user.player,
});

export default connect(mapStateToProps)(Game);
