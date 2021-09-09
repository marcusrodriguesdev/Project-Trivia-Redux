import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { name, email, score } = this.props;
    const url = `https://www.gravatar.com/avatar/${md5(email).toString()}`;
    return (
      <header>
        {/* { // utilizando o md5 } */}
        <img src={ url } alt="profile" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{ name }</p>
        <h3 data-testid="header-score">{ score }</h3>
      </header>
    );
  }
}

Header.propTypes = ({
  name: PropTypes.string,
  email: PropTypes.string,
  score: PropTypes.number,
}).isRequired;

const mapStateToProps = ({ user: { name, email, score } }) => ({
  name,
  email,
  score,
});

export default connect(mapStateToProps)(Header);
