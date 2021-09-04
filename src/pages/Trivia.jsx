import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import GamePage from './GamePage';

class Trivia extends React.Component {
  setToken() {
    const { savedToken } = this.props;
    localStorage.setItem('token', savedToken);
  }

  render() {
    const { history } = this.props;
    this.setToken();

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
  savedToken: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, null)(Trivia);
