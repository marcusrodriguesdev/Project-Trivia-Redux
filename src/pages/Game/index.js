import React, { Component } from 'react';

import Question from '../../components/Question';

import { getQuestion, getToken } from '../../services/questionApi';

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
    const token = await getToken();
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

export default Game;
