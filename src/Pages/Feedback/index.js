import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  render() {
    const { dados } = this.props;
    const { name, profile, score } = dados;
    return (
      <div>
        <header>
          <span data-testid="feedback-text">Feedback</span>
          <p data-testid="header-player-name">{ name }</p>
          <p data-testid="header-score">{ score }</p>
          <img
            src={ `https://www.gravatar.com/avatar/${profile}` }
            alt="gravatar"
            data-testid="header-profile-picture"
          />
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dados: state.scoreReducer,
});

export default connect(mapStateToProps, null)(Feedback);

Feedback.propTypes = {
  dados: PropTypes.objectOf(PropTypes.string).isRequired,
};
