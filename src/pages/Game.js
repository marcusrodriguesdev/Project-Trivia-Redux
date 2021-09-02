import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Game extends Component {
  constructor(props) {
    super(props);

    this.getTokenToState = this.getTokenToState.bind(this);
  }

  getTokenToState() {
    const { token } = this.props;
    localStorage.setItem('token', token);
  }

  render() {
    this.getTokenToState();
    return (
      <div>Game</div>
    );
  }
}

Game.propTypes = {
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.user.token,
});

export default connect(mapStateToProps)(Game);
