import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import GamePage from './GamePage';

class Trivia extends React.Component {
  render() {
    const { history } = this.props;

    return (
      <div className="game-page">
        <GamePage history={ history } />
        <Header />
      </div>
    );
  }
}

Trivia.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Trivia;
