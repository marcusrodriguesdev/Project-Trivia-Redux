import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      clicked: true,
    });
  }

  answersRender(questions) {
    const { clicked } = this.state;
    return (
      <ul>
        <label
          data-testid="correct-answer"
          htmlFor="correct"
          className={ clicked ? 'green-border' : '' }
        >
          <input type="radio" id="correct" name="answer" onClick={ this.handleClick } />
          {questions[0].correct_answer}
          <br />
        </label>
        {questions[0].incorrect_answers.map((answer, index) => (
          <label
            data-testid="wrong-answer"
            htmlFor={ index }
            key={ index }
            className={ clicked ? 'red-border' : '' }
          >
            <input
              type="radio"
              id={ index }
              name="answer"
              key={ index }
              data-testid={ `wrong-answer-${index}` }
              onClick={ this.handleClick }
            />
            {answer}
            <br />
          </label>))}
      </ul>
    );
  }

  render() {
    const { player, questions } = this.props;
    return (
      <div>
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
