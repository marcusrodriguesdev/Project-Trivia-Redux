import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FeedbackHeader extends Component {
  render() {
    const { name, image, total } = this.props;
    return (
      <header
        className="header"
      >
        <img
          src={ image }
          alt="User logo"
          data-testid="header-profile-picture"
          className="gravatar"
        />

        <h2
          data-testid="header-player-name"
          className="player-name teste"
        >
          { name }
        </h2>

        <span
          data-testid="header-score"
          className="score"
        >
          { score }
        </span>
      </header>
    );
  }
}

FeedbackHeader.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.userReducer.name,
  image: state.userReducer.image,
  total: state.scoreReducer.total,
});

export default connect(mapStateToProps)(FeedbackHeader);
