import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { Link } from 'react-router-dom';

class FeedbackPage extends React.Component {
  constructor() {
    super();

    this.state = {
      feedbackMsg: '',
    };

    this.handleFeedbackMsg = this.handleFeedbackMsg.bind(this);
  }

  componentDidMount() {
    const { assertions } = this.props;
    this.handleFeedbackMsg(assertions);
    console.log(this.state);
  }

  handleFeedbackMsg(assertionsNumber) {
    const NUMBER_TREE = 3;

    if (assertionsNumber < NUMBER_TREE) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  render() {
    const { email, name, score, assertions } = this.props;
    const avatarPath = md5(email).toString();
    return (
      <>
        <div data-testid="header-player-name">{ name }</div>
        <img
          data-testid="header-profile-picture"
          alt="profile avatar"
          src={ `https://www.gravatar.com/avatar/${avatarPath}` }
        />
        <div data-testid="header-score">{ score }</div>
        <div data-testid="feedback-text">{ this.handleFeedbackMsg(assertions) }</div>
        <Link to="/">
          <button data-testid="btn-play-again" type="button"> Jogar Novamente </button>
        </Link>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.email,
  name: state.player.name,
  score: state.player.score,
  assertions: state.player.assertions,
});

FeedbackPage.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(FeedbackPage);
