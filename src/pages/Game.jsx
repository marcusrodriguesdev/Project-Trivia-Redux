import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Questions from '../components/Questions';
import { fetchApi } from '../actions';

class Game extends Component {
  componentDidMount() {
    const { fetch } = this.props;
    const token = JSON.parse(localStorage.getItem('token'));
    fetch(token);
  }

  render() {
    const { response } = this.props;
    const { name, email } = this.props;
    const hashEmail = md5(email).toString();
    return (
      <div>
        <header>
          <img src={ `https://www.gravatar.com/avatar/${hashEmail}` } alt="Gravatar" data-testid="header-profile-picture" />
          <h2 data-testid="header-player-name">{ name }</h2>
          <h2 data-testid="header-score">0</h2>
        </header>
        {response && <Questions resp={ response } />}
      </div>
    );
  }
}

Game.propTypes = {
  email: PropTypes.string.isRequired,
  fetch: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  response: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.login.user,
  email: state.login.email,
  response: state.trivia.response.results,
});
const mapDispatchToProps = (dispatch) => ({
  fetch: (token) => dispatch(fetchApi(token)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Game);
