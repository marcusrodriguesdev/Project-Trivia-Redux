import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FeedBack extends React.Component {
  render() {
    const { assertions } = this.props;
    const FEEDBACK_NUMBER = 3;
    return (
      <div data-testid="feedback-text">
        { assertions < FEEDBACK_NUMBER ? 'Podia ser melhor...' : 'Mandou bem!' }
      </div>
    );
  }
}

FeedBack.propTypes = {
  assertions: PropTypes.string,
}.isRequired;

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
});

export default connect(mapStateToProps)(FeedBack);
