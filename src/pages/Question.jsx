import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js/md5';

class Question extends Component {
  constructor(props) {
    super(props);
    this.handleEmailConversion = this.handleEmailConversion.bind(this);
  }

  handleEmailConversion() {
    const { gravatarEmail } = this.props;
    const emailHash = MD5(gravatarEmail).toString();
    const response = `https://www.gravatar.com/avatar/${emailHash}`;
    return response;
  }

  render() {
    const { name, score } = this.props;
    return (
      <header>
        <img
          src={ this.handleEmailConversion }
          alt="avatar"
          data-testid="header-profile-picture"
        />
        <h2 data-testid="header-player-name">{ name }</h2>
        <h3 data-testid="header-score">{ score }</h3>
      </header>
    );
  }
}

Question.propTypes = {
  gravatarEmail: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = ({ login }) => ({
  gravatarEmail: login.gravatarEmail,
  name: login.name,
  score: login.score,
});

export default connect(mapStateToProps, null)(Question);
