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

  handleClick() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { name, score, assertions } = this.props;
    return (
      <>
        <header>
          <img
            src={ this.handleEmailConversion() }
            alt="avatar"
            ata-testid="header-profile-picture"
          />
          <h1
            data-testid="header-player-name"
          >
            { name }
          </h1>
          <h2 data-testid="feedback-total-score">{ score }</h2>
          <h1 data-testid="feedback-total-question">{assertions}</h1>
          <h1 data-testid="feedback-text">{ this.handleFeedbackMessage() }</h1>
        </header>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.handleClick }
        >
          Jogar novamente
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

const mapStateToProps = ({ login }) => ({
  gravatarEmail: login.gravatarEmail,
  name: login.name,
  score: login.score,
  assertions: login.assertions,
});

export default connect(mapStateToProps)(Feedback);