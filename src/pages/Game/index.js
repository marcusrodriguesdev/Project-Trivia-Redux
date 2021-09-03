import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Question from '../../components/Question';

import { getQuestion } from '../../services/questionApi';
import Timer from '../../components/Timer';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionInfo: {},
      timeOver: false,
    };

    this.fetchQuestion = this.fetchQuestion.bind(this);
    this.setTimeOver = this.setTimeOver.bind(this);
  }

  componentDidMount() {
    this.fetchQuestion();
  }

  setTimeOver() {
    this.setState({
      timeOver: true,
    });
  }

  async fetchQuestion() {
    const { token } = this.props;

    const questionInfo = await getQuestion(token);

    this.setState({
      questionInfo,
    });
  }

  render() {
    const { questionInfo, timeOver } = this.state;

    return (
      <div>
        <h1>Game</h1>
        <Timer setTimeOver={ this.setTimeOver } />
        {questionInfo.question && <Question
          timeOver={ timeOver }
          questionInfo={ questionInfo }
        />}
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
