import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alternatives from '../components/Alternatives';
import Question from '../components/Question';
import { fetchQuestions as fetchQuestionsAction } from '../redux/actions/index';

class GamePage extends React.Component {
  async componentDidMount() {
    const { fetchQuestions } = this.props;
    await fetchQuestions();
  }

  render() {
    return (
      <div>
        <Question />
        <Alternatives />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: () => dispatch(fetchQuestionsAction()),
});

GamePage.propTypes = {
  fetchQuestions: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(GamePage);
