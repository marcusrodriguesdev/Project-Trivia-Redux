import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeStop } from '../redux/actions';

class BtnPlayAgain extends Component {
  constructor(props) {
    super(props);

    this.playAgain = this.playAgain.bind(this);
  }

  playAgain() {
    const { addStop, history } = this.props;
    addStop();
    history.push('/');
  }

  render() {
    return (
      <button
        type="button"
        data-testid="btn-go-home"
        onClick={ this.playAgain }
      >
        JOGAR NOVAMENTE
      </button>
    );
  }
}

BtnPlayAgain.propTypes = {
  addStop: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addStop: () => dispatch(changeStop()),
});

export default connect(null, mapDispatchToProps)(BtnPlayAgain);
