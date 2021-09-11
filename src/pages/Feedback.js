import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import md5 from 'crypto-js/md5';

import Header from '../components/Header';

class Feedback extends React.Component {
//   constructor(props) {
//     super(props);

  //     // this.getFeedback = this.getFeedback.bind(this);
  //   }

  // componentDidMount() {
  //   const { user: { email } } = this.props;
  //   const userImg = md5(email).toString();
  //   // const playerInfo = JSON.parse(localStorage.getItem('state'));
  //   // const player = [{
  //   //   id: 0,
  //   //   name: playerInfo.player.name,
  //   //   score: playerInfo.player.score,
  //   //   picture: userImg,
  //   // }];
  //   const player = JSON.parse(localStorage.getItem('state'));
  //   const ranking = JSON.parse(localStorage.getItem('ranking'));
  //   const novoRanking = [
  //     ...ranking, { name: player.player.name,
  //       score: player.player.score,
  //       picture: userImg },
  //   ];

  //   localStorage.setItem('ranking', JSON.stringify(novoRanking));
  // }

  render() {
    const player = JSON.parse(localStorage.getItem('state'));
    const MIN_ASSERTIONS = 3;

    const getFeedback = () => (player.player.assertions < MIN_ASSERTIONS
      ? 'Podia ser melhor...'
      : 'Mandou bem!');
    return (
      <div className="feedback">
        <Header score={ player.player.score } />
        <p data-testid="feedback-text">{ getFeedback() }</p>

        <p data-testid="feedback-total-score">
          { player.player.score }
        </p>
        <p data-testid="feedback-total-question">
          { player.player.assertions }
        </p>

        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>

        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ver ranking
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.reducerLogin.user,
});

Feedback.propTypes = {
  user: PropTypes.shape({
    nome: PropTypes.string,
    email: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
