import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import Header from './Header';

class Feedback extends Component {
  feedbackMessage() {
    const { assertions } = this.props;
    const MIN_TO_BE_GOOD = 3;
    if (assertions >= MIN_TO_BE_GOOD) {
      return <h3 data-testid="feedback-text">Mandou bem!</h3>;
    }
    return <h3 data-testid="feedback-text">Podia ser melhor...</h3>;
  }

  render() {
    return (
      <div className="App">
        {/* <Header /> */}
        { this.feedbackMessage() }
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
});

export default connect(mapStateToProps)(Feedback);
