import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import GamePage from './GamePage';

class Trivia extends React.Component {
  render() {
    const { history } = this.props;

    return (
      <div>
        <Header />
        <GamePage history={ history } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  savedToken: state.user.token,
});

Trivia.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, null)(Trivia);
