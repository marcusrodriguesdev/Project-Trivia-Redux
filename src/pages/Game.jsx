import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getQuestionThunk } from '../redux/actions';
import QuestionsComponent from '../components/QuestionsComponent';

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
        { questions.length > 0 && <QuestionsComponent questions={ questions } />}
      </div>
    );
  }
}

Game.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  score: PropTypes.number,
  token: PropTypes.string,
  fetchQuestions: PropTypes.func,
  questions: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

const mapStateToProps = ({
  user: { token, name, email, score },
  results: { questions },
}) => ({
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
