import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';

import { fetchTokenThunk } from '../redux/actions';
import { Link } from 'react-router-dom';

class PlayButton extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    const { fetchToken, history, token } = this.props;
    await fetchToken();
    localStorage.setItem('token', token);
    // history.push('/game');
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
});

const mapStateToProps = (state) => ({
  token: state.myReducer.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayButton);

PlayButton.propTypes = {
  fetchToken: Proptypes.func.isRequired,
  history: Proptypes.objectOf.isRequired,
  token: Proptypes.string.isRequired,
  buttonCheck: Proptypes.func.isRequired,
};
