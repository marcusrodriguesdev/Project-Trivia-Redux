import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

class Feedback extends React.Component {
  handleButton() {
    const { history } = this.props;

    history.push('/');
  }

  render() {
    return (
      <div data-testid="feedback-text">
        <Header />
        <main>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.handleButton.bind(this) }
          >
            Jogar novamente
          </button>

        </main>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Feedback;
