import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class FeedBack extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div data-testid="feedback-text">
        FeedBack
        <div>
          <Header />
          <button
            onClick={ () => history.push('/') }
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </div>
      </div>
    );
  }
}
FeedBack.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default FeedBack;
