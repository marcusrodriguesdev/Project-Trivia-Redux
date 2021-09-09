import React from 'react';
import PropTypes from 'prop-types';
import { MD5 } from 'crypto-js';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();
    this.createState = this.createState.bind(this);
  }

  componentDidMount() {
    const state = this.createState();
    localStorage.setItem('state', JSON.stringify(state));
  }

  componentDidUpdate() {
    const state = this.createState();
    localStorage.setItem('state', JSON.stringify(state));
  }

  createState() {
    const { name, gravatarEmail, score, assertions } = this.props;
    const state = {
      player: {
        name,
        gravatarEmail,
        score,
        assertions,
      },
    };
    return state;
  }

  render() {
    const { name, email, score } = this.props;

    const hash = MD5(email).toString();
    return (
      <header className="main-header">
        <img data-testid="header-profile-picture" alt="cabeça" src={ `https://www.gravatar.com/avatar/${hash}` } />
        <h2 data-testid="header-player-name">
          { name }
        </h2>
        <h1 data-testid="header-score">
          {`SCORE: ${score}`}
        </h1>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
