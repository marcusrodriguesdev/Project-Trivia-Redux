import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getQuestionThunk } from '../redux/actions';
import QuestionsComponent from '../components/QuestionsComponent';

class Game extends React.Component {
  componentDidMount() {
    const { token, fetchQuestions } = this.props;
    fetchQuestions(token);
  }

  render() {
    const { questions } = this.props;
    return (
      <div>
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

const mapStateToProps = ({ user: { token }, results: { questions } }) => ({
  questions,
  token,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (payload) => dispatch(getQuestionThunk(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
