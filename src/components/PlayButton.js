import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';

import playIcon from '../play-button.svg';
import { setNameAction, fetchQuestionThunk, setEmailAction } from '../redux/actions';

class PlayButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { setEmail, setName, playerName, playerEmail,
      fetchQuestion, config, token, history } = this.props;
    setEmail(playerEmail);
    setName(playerName);
    fetchQuestion(config, token);
    history.push('/game');
  }

  render() {
    const { buttonCheck } = this.props;
    return (
      <div>
        <button
          type="button"
          disabled={ buttonCheck }
          onClick={ this.handleClick }
          data-testid="btn-play"
          className="system-btn play-btn"
        >
          <img src={ playIcon } alt="play-icon" />
          Jogar!
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setName: (payload) => dispatch(setNameAction(payload)),
  setEmail: (payload) => dispatch(setEmailAction(payload)),
  fetchQuestion: (config, token) => dispatch(fetchQuestionThunk(config, token)),
});

const mapStateToProps = (state) => ({
  token: state.game.token,
  config: state.config.selection,
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayButton);

PlayButton.propTypes = {
  fetchQuestion: Proptypes.func.isRequired,
  token: Proptypes.string.isRequired,
  buttonCheck: Proptypes.bool.isRequired,
  setName: Proptypes.func.isRequired,
  setEmail: Proptypes.func.isRequired,
  playerEmail: Proptypes.string.isRequired,
  playerName: Proptypes.string.isRequired,
  history: Proptypes.objectOf().isRequired,
  config: Proptypes.objectOf().isRequired,
};
