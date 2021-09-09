import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';

import { fetchTokenThunk, setNameAction,
  fetchQuestionThunk, setEmailAction } from '../redux/actions';

class PlayButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    const { fetchToken, fetchQuestion, token, setEmail, setName,
      playerName, playerEmail } = this.props;
    setEmail(playerEmail);
    setName(playerName);
    await fetchToken();
    localStorage.setItem('token', token);
    const player = {
      name: playerName,
      gravatarEmail: playerEmail,
      score: 0,
      assertions: 0,
    };
    localStorage.setItem('state', JSON.stringify(player));
    await fetchQuestion(token);
  }

  render() {
    const { buttonCheck } = this.props;
    return (
      <div>
        <Link to="/game">
          <button
            type="button"
            disabled={ buttonCheck }
            onClick={ this.handleClick }
            data-testid="btn-play"
          >
            Jogar!
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchToken: () => dispatch(fetchTokenThunk()),
  setName: (payload) => dispatch(setNameAction(payload)),
  setEmail: (payload) => dispatch(setEmailAction(payload)),
  fetchQuestion: (results) => dispatch(fetchQuestionThunk(results)),
});

const mapStateToProps = (state) => ({
  token: state.myReducer.token,

});

export default connect(mapStateToProps, mapDispatchToProps)(PlayButton);

PlayButton.propTypes = {
  fetchQuestion: Proptypes.func.isRequired,
  fetchToken: Proptypes.func.isRequired,
  token: Proptypes.string.isRequired,
  buttonCheck: Proptypes.bool.isRequired,
  setName: Proptypes.func.isRequired,
  setEmail: Proptypes.func.isRequired,
  playerEmail: Proptypes.string.isRequired,
  playerName: Proptypes.string.isRequired,
};
