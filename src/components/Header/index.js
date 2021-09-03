import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { name, gravatarEmail } = this.props;
    return (
      <>
        <img
          data-testid="header-profile-picture"
          alt="Foto de perfil"
          src={ gravatarEmail }
        />
        <h3 data-testid="header-player-name">{name}</h3>
        <h3 data-testid="header-score">0</h3>
      </>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.auth.name,
  gravatarEmail: state.auth.gravatar,
});

export default connect(mapStateToProps)(Header);
