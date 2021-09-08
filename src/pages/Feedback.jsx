import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { name, avatar, score } = this.props;
    return (
      <div>
        <Header name={ name } avatar={ avatar } score={ score } />
        <p data-testid="feedback-text">
          Feedback
        </p>
      </div>
    );
  }
}

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (
  { player: { playerInfo: { name, avatar }, score } },
) => ({
  name, avatar, score,
});

export default connect(mapStateToProps)(Feedback);
