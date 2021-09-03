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

    const { guessed } = this.props;

    return (
      <div>
        <h1>Game</h1>
        {questionInfo.question && <Question questionInfo={ questionInfo } />}
        {guessed && <button data-testid="btn-next" type="button">Próxima</button>}
      </div>
    );
  }
}

Game.propTypes = {
  token: PropTypes.string.isRequired,
  guessed: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ auth, game }) => ({
  token: auth.token,
  guessed: game.guessed,
});

export default connect(mapStateToProps)(Game);
