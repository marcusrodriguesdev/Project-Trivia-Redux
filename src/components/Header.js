import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { name, score } = this.props;
    return (
      <div>
        <header className="header">
          <img
            src="https://www.gravatar.com/avatar/"
            data-testid="header-profile-picture"
            alt="gravatar"
          />
          <h3 data-testid="header-player-name">
            { name }
          </h3>
          <p data-testid="header-score">
            { `Score: ${score}` }
          </p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
