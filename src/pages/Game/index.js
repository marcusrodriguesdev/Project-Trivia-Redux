import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Question from '../../components/Question';

import { getQuestion } from '../../services/questionApi';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionInfo: {},
    };

    this.fetchQuestion = this.fetchQuestion.bind(this);
  }

  componentDidMount() {
    this.fetchQuestion();
  }

  async fetchQuestion() {
    const { token } = this.props;

    const questionInfo = await getQuestion(token);

    this.setState({
      questionInfo,
    });
  }

  render() {
    const { questionInfo } = this.state;

    return (
      <div>
        <h1>Game</h1>
        {questionInfo.question && <Question questionInfo={ questionInfo } />}
      </div>
    );
  }
}

Game.propTypes = {
  token: PropTypes.string.isRequired,
};

const mapStateToProps = ({ auth }) => ({
  token: auth.token,
});

export default connect(mapStateToProps)(Game);
