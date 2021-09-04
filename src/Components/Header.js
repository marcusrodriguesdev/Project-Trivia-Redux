import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CryptoJS = require('crypto-js');

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.fetchAvatar = this.fetchAvatar.bind(this);
  }

  componentDidMount() {
    const { name, points, email } = this.props;
    const player = { name, score: points, gravatarEmail: email };
    localStorage.setItem('state', JSON.stringify({ player }));
  }

  fetchAvatar() {
    const { email } = this.props;
    const hashGerada = CryptoJS.MD5(email).toString();

    const fetchApi = (`https://www.gravatar.com/avatar/${hashGerada}`);

    return fetchApi;
  }

  render() {
    const { name, points } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ this.fetchAvatar() }
          alt="Foto de perfil do Usuario"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ points }</p>
      </header>
    );
  }
}

const mapStateToProps = ({ user: { email, name }, trivia: { points } }) => ({
  email,
  name,
  points,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
