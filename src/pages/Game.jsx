import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import md5 from 'crypto-js/md5';
import { getQuestionThunk } from '../redux/actions';
import QuestionsComponent from '../components/QuestionsComponent';

class Game extends React.Component {
  componentDidMount() {
    const { token, fetchQuestions } = this.props;
    fetchQuestions(token);
  }

  render() {
    const { name, email, questions } = this.props;
    return (
      <div>
        <header>
          {/* { // utilizando o md5 } */}
          <img src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` } alt="profile" data-testid="header-profile-picture" />
          <p data-testid="header-player-name">{ name }</p>
          <p data-testid="header-score">0</p>
        </header>
        { questions.length > 0 && <QuestionsComponent questions={ questions } />}
      </div>
    );
  }
}

Game.propTypes = {
  token: PropTypes.string.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = ({ user: { token, name, email }, results: { questions } }) => ({
  questions,
  token,
  name,
  email,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (payload) => dispatch(getQuestionThunk(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
