import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
          <ul>
            <li data-testid="correct-answer">
              {questions[0].correct_answer}
            </li>
            {questions[0].incorrect_answers.map((answer, index) => (
              <li key="index" data-testid={ `wrong-answer-${index}` }>
                {answer}
              </li>))}
          </ul>
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
