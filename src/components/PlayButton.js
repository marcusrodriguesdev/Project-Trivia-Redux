import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';

import { fetchTokenThunk } from '../redux/actions';

class PlayButton extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    const { fetchToken, token } = this.props;
    await fetchToken();
    localStorage.setItem('token', token);
  }

  render() {
    const { buttonCheck } = this.props;
    return (
      <div>
        <Link to="/jogar">
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
  token: Proptypes.string.isRequired,
  buttonCheck: Proptypes.func.isRequired,
};
