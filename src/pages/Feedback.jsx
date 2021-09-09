import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleEmailConversion = this.handleEmailConversion.bind(this);
    this.handleFeedbackMessage = this.handleFeedbackMessage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSaveScore = this.handleSaveScore.bind(this);
    this.handleSaveLocal = this.handleSaveLocal.bind(this);
  }

  handleEmailConversion() {
    const { gravatarEmail } = this.props;
    const emailHash = md5(gravatarEmail).toString();
    const response = `https://www.gravatar.com/avatar/${emailHash}`;
    return response;
  }

  handleFeedbackMessage() {
    const { assertions } = this.props;
    const minAssertion = 3;
    return assertions >= minAssertion ? 'Mandou bem!' : 'Podia ser melhor...';
  }

  handleSaveScore() {
    const { name, score } = this.props;
    const picture = this.handleEmailConversion();
    return {
      name,
      score,
      picture,
    };
  }

  handleSaveLocal() {
    const rankingData = this.handleSaveScore();
    const savedData = JSON.parse(localStorage.getItem('ranking'));
    if (!savedData) {
      localStorage.setItem('ranking', JSON.stringify([rankingData]));
    } else {
      savedData.push(rankingData);
      localStorage.setItem('ranking', JSON.stringify(savedData));
    }
  }

  handleClick(nameRoute) {
    const { history } = this.props;
    this.handleSaveLocal();
    history.push(nameRoute);
  }

  render() {
    const { name, score, assertions } = this.props;
    const state = JSON.parse(localStorage.getItem('state'));
    return (
      <>
        <header>
          <img
            src={ this.handleEmailConversion() }
            alt="avatar"
            data-testid="header-profile-picture"
          />
          <h1 data-testid="header-player-name">
            { name }
          </h1>
          <h1 data-testid="header-score">
            { score }
          </h1>
          <h2 data-testid="feedback-total-score">{ score }</h2>
          <h1 data-testid="feedback-total-question">{assertions}</h1>
          <h1 data-testid="feedback-text">{ this.handleFeedbackMessage() }</h1>
          {console.log(typeof state.player.score)}
        </header>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ () => this.handleClick('/') }
        >
          Jogar novamente
        </button>
        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ () => this.handleClick('/ranking') }
        >
          Ver Ranking
        </button>
      </>
    );
  }
}

Feedback.propTypes = ({
  gravatarEmail: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
  assertions: PropTypes.number,
}.isRequired);

const mapStateToProps = ({ player }) => ({
  gravatarEmail: player.gravatarEmail,
  name: player.name,
  score: player.score,
  assertions: player.assertions,
});

export default connect(mapStateToProps)(Feedback);
