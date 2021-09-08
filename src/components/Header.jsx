import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/Header.css';

class Header extends Component {
  render() {
    const { name, score } = this.props;
    return (
      <header className="cabecalho">
        <div>
          <img
            src="https://www.gravatar.com/avatar/HASH"
            alt="avatar"
            data-testid="header-profile-picture"
          />
        </div>
        <div>
          <span
            data-testid="header-player-name"
          >
            { name }
          </span>
        </div>
        <div>
          <span data-testid="header-score">{ score }</span>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps, null)(Header);
