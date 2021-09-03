import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';

class Feedback extends React.Component {
  assertionsVerify(assert) {
    const minAssert = 3;
    if (assert < minAssert) {
      return <p>Podia ser melhor...</p>;
    }
    return <p>Mandou bem!</p>;
  }

  render() {
    const localstorage = JSON.parse(localStorage.getItem('state'));
    const { player: { score, assertions } } = localstorage;
    const { name, email } = this.props;
    const hashEmail = md5(email).toString();
    return (
      <div>
        <header>
          <img src={ `https://www.gravatar.com/avatar/${hashEmail}` } alt="Gravatar" data-testid="header-profile-picture" />
          <h2 data-testid="header-player-name">{ name }</h2>
          <h2 data-testid="header-score">{ score }</h2>
          <p data-testid="feedback-text">{ this.assertionsVerify(assertions) }</p>
        </header>
        <section>
          <p data-testid="feedback-total-score">{score}</p>
          <p data-testid="feedback-total-question">{ assertions }</p>
        </section>
        <Link to="/" data-testid="btn-play-again">Jogar novamente</Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.login.user,
  email: state.login.email,
});

export default connect(mapStateToProps, null)(Feedback);
