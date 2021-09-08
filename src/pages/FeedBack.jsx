import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class FeedBack extends React.Component {
  render() {
    const { player: { score, assertions } } = this.props;

    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">FeedBack</h1>
        <h4 data-testid="feedback-total-score">{ score }</h4>
        <h4 data-testid="feedback-total-question">{ assertions }</h4>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

FeedBack.propTypes = {
  player: PropTypes.shape({
    score: PropTypes.number,
    assertions: PropTypes.number,
  }).isRequired,
};

export default connect(mapStateToProps)(FeedBack);
