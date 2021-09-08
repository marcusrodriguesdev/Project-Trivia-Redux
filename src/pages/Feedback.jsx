import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 1,
      message: '',
      correctAnswers: 0,
    };
  }

  FeedbackMensage() {
    const { score } = this.state;
    const tryAgain = 'Podia ser melhor...';
    const goodJob = 'Mandou bem!';
    const MIN_SCORE = 3;
    // recuperar score
    if (score < MIN_SCORE) {
      this.setState = ({ message: tryAgain });
    } else {
      this.setState = ({ message: goodJob });
    }
  }

  render() {
    const { score, message, correctAnswers } = this.state;
    const { picture, name } = this.props;

    return (
      <div>
        <header>
          <img src={ picture } alt="foto" data-testid="header-profile-picture" />
          <h4 data-testid="header-player-name">{ name }</h4>
          <h6 data-testid="header-score">{ score }</h6>
        </header>
        <h2 data-testid="feedback-text">{ message }</h2>
        <h6 data-testid="feedback-total-score">{score}</h6>
        <h6 data-testid="feedback-total-question">{ correctAnswers }</h6>
        <Link to="/">
          <button
            data-testid="btn-play-again"
            type="button"
          >
            Jogar novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button
            data-testid="btn-ranking"
            type="button"
          >
            Ver Ranking
            {/* adicionar test id no titulo da page ranking */}
          </button>
        </Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  picture: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  picture: state.gravatar.gravatarURL,
  name: state.loginReducer.name,
});

export default connect(mapStateToProps)(Feedback);
