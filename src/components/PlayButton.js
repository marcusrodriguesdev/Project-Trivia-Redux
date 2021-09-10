import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';

import { fetchTokenThunk, setNameAction,
  fetchQuestionThunk, setEmailAction } from '../redux/actions';

class PlayButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate() {
    const { fetchQuestion, token, config, history } = this.props;
    if (token.length > 0) {
      localStorage.setItem('token', token);
      console.log(token);
      fetchQuestion(config, token);
      history.push('/game');
    }
  }

  handleClick() {
    const { fetchToken, setEmail, setName,
      playerName, playerEmail } = this.props;
    setEmail(playerEmail);
    setName(playerName);
    fetchToken();
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
        >
          Jogar!
        </button>
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
  config: state.config.selection,
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayButton);

PlayButton.propTypes = {
  fetchQuestion: Proptypes.func.isRequired,
  fetchToken: Proptypes.func.isRequired,
  token: Proptypes.string.isRequired,
  buttonCheck: Proptypes.func.isRequired,
  setName: Proptypes.func.isRequired,
  setEmail: Proptypes.func.isRequired,
  playerEmail: Proptypes.string.isRequired,
  playerName: Proptypes.string.isRequired,
  history: Proptypes.objectOf().isRequired,
  config: Proptypes.objectOf().isRequired,
};
