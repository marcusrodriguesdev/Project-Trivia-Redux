import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Game extends React.Component {
  componentDidUpdate() {
    this.setToken();
  }

  setToken() {
    const { savedToken } = this.props;
    localStorage.setItem('token', savedToken);
  }

  render() {
    return (
      <div>Game</div>
    );
  }
}

const mapStateToProps = (state) => ({
  savedToken: state.user.token,
});

Game.propTypes = {
  savedToken: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Game);
