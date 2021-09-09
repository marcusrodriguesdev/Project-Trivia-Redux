import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';

class FeedbackMensage extends Component {
  render() {
    const { score } = this.props;
    const goodScore = 3;
    return (
      <div>
        <p data-testid="feedback-text">
          { score.questions >= goodScore ? 'Mandou bem!' : 'Podia ser melhor...' }
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.user.score,
});

export default connect(mapStateToProps, null)(FeedbackMensage);

FeedbackMensage.propTypes = {
  score: Proptypes.objectOf().isRequired,
};
