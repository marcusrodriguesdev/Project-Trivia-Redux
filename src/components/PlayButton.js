import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';

import { fetchTokenThunk } from '../redux/actions';

class PlayButton extends Component {
  handleClick() {
    const { fetchToken, history } = this.props;
    const token = fetchToken();
    localStorage.setItem({ token });
    history.push('/jogar');
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
});

export default connect(null, mapDispatchToProps)(PlayButton);

PlayButton.propTypes = {
  history: Proptypes.objectOf.isRequired,
  buttonCheck: Proptypes.func.isRequired,
  fetchToken: Proptypes.func.isRequired,
};
