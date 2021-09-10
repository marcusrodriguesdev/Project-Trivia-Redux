import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import { getQuestionThunk } from '../redux/actions';
import QuestionsComponent from '../components/QuestionsComponent';
import Header from '../components/Header';

class Game extends React.Component {
  componentDidMount() {
    const { token, fetchQuestions } = this.props;
    fetchQuestions(token);
  }

  render() {
    const { name, email, questions, score } = this.props;
    return (
      <div>
        <Header
          name={ name }
          email={ email }
          score={ score }
        />
        {/* <header>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
            alt="profile"
          />
          <p data-testid="header-player-name">{ name }</p>
          <p data-testid="header-score">0</p>
        </header> */}
        { questions.length > 0 && <QuestionsComponent questions={ questions } />}
      </div>
    );
  }
}

Game.propTypes = {
  token: PropTypes.string.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ user: { token, name, email, score }, results: { questions } }) => ({
  questions,
  token,
  name,
  email,
  score,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (payload) => dispatch(getQuestionThunk(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
