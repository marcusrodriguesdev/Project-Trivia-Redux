import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import './style.css';

class Header extends React.Component {
  render() {
    const { name, gravatarEmail = '', score } = this.props;
    return (
      <header>
        <div className="header-container">
          <div className="left-section">
            <img
              data-testid="header-profile-picture"
              alt="Foto de perfil"
              src={ gravatarEmail }
            />
            <h4 data-testid="header-player-name">{name}</h4>
          </div>
          <div className="right-section">
            <h3 data-testid="header-score">{score}</h3>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

Header.defaultProps = {
  gravatarEmail: '',
};

const mapStateToProps = ({ auth, game }) => ({
  name: auth.name,
  gravatarEmail: auth.gravatar,
  score: game.score,
});

export default connect(mapStateToProps)(Header);
