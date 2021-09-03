import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      imgURL: '',
      score: 0,
    };
  }

  componentDidMount() {
    this.fetchGravatar();
  }

  async fetchGravatar() {
    const { email } = this.props;
    const gravatarEmail = md5(email).toString();
    const gravatarURL = `https://www.gravatar.com/avatar/${gravatarEmail}`;
    const response = await fetch(gravatarURL);
    this.setState({
      imgURL: response.url,
    });
  }

  render() {
    const { name } = this.props;
    const { imgURL, score } = this.state;
    return (
      <header>
        <img data-testid="header-profile-picture" src={ imgURL } alt="gravatar" />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
});

Header.propTypes = {
  name: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
