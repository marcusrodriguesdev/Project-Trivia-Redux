import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CryptoJS = require('crypto-js');

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.fetchAvatar = this.fetchAvatar.bind(this);
  }

  fetchAvatar() {
    const { email } = this.props;
    const hashGerada = CryptoJS.MD5(email).toString();

    const fetchApi = (`https://www.gravatar.com/avatar/${hashGerada}`);

    return fetchApi;
  }

  render() {
    const { name } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ this.fetchAvatar() }
          alt="Foto de perfil do Usuario"
        />
        <p>
          <span data-testid="header-player-name">{ name }</span>
          <span data-testid="header-score"> 0 </span>
        </p>
      </header>
    );
  }
}

const mapStateToProps = ({ user: { email, name } }) => ({
  email,
  name,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
