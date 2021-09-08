import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FeedbackHeader extends Component {
  render() {
    const { name, image, score } = this.props;
    return (
      <header>
        <img src={ image } alt="User logo" data-testid="header-profile-picture" />
        <h2 data-testid="header-player-name">{ name }</h2>
        <span data-testid="header-score">{ score }</span>
      </header>
    );
  }
}

FeedbackHeader.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.reducer.name,
  image: state.reducer.image,
  score: state.reducer.score,
});

export default connect(mapStateToProps)(FeedbackHeader);
