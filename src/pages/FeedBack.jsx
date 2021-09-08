import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class FeedBack extends Component {
  render() {
    const { name } = this.props;
    return (
      <header>
        <img
          src="https://www.gravatar.com/avatar/"
          data-testid="header-profile-picture"
          alt="gravatar"
        />
        <h3 data-testid="header-player-name">
          { name }
        </h3>
        <p data-testid="correct-answer">test</p>
        <p data-testid="header-score">3</p>
        <button type="button" data-testid="btn-next">test</button>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
});

FeedBack.propTypes = {
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(FeedBack);
