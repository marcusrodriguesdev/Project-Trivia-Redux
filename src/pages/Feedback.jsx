import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import FeedbackHeader from '../components/FeedbackHeader';

class Feedback extends Component {
  // const { name, image, score } = this.props;
  render() {
    return (
      <div>
        <FeedbackHeader />
        Feedback
      </div>
    );
  }
}

/* Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.reducer.name,
  image: state.reducer.image,
  score: state.reducer.score,
}); */

export default connect(mapStateToProps)(Feedback);
