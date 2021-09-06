import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    return (
      <>
        <img
          data-testid="header-profile-picture"
          alt="Foto de perfil"
          src={ gravatarEmail }
        />
        <h3 data-testid="header-player-name">{name}</h3>
        <h3 data-testid="header-score">{score}</h3>
      </>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ auth, game }) => ({
  name: auth.name,
  gravatarEmail: auth.gravatar,
  score: game.score,
});

export default connect(mapStateToProps)(Header);
