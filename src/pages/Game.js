import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { saveQuestions } from '../actions';

class Game extends Component {
  componentDidMount() {
    const { fillQuestions } = this.props;
    fillQuestions();
  }

  render() {
    const { name, email, isFetching } = this.props;
    const emailHash = md5(email).toString();
    return (
      <>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${emailHash}` }
            alt="Avatar"
          />
          <span data-testid="header-player-name">{ name }</span>
          <span data-testid="header-score">0</span>
        </header>
        {isFetching ? <p>Estou carregando</p> : <p>Perguntas renderizadas</p>}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.login.name,
  email: state.login.email,
  isFetching: state.questions.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fillQuestions: () => dispatch(saveQuestions()),
});

Game.propTypes = {
  isFetching: PropTypes.bool,
  name: PropTypes.string,
  email: PropTypes.string,
  fillQuestions: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
