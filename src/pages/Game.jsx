import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import Multiple from '../components/Multiple';
import Boolean from '../components/Boolean';

import arabesco from '../image/arabesco-column.png';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      indexQuestion: 0,
      chronometer: 30,
      isEnabled: true,
      round: [],
      loading: true,
    };
    this.setRoundState = this.setRoundState.bind(this);
    this.updateIsEnabled = this.updateIsEnabled.bind(this);
    this.endRound = this.endRound.bind(this);
    this.nextRound = this.nextRound.bind(this);
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    const { chronometer, isEnabled } = this.state;
    this.chronometerId = setInterval(() => {
      if (chronometer > 0 && isEnabled) {
        this.setState((prevState) => ({ chronometer: prevState.chronometer - 1 }));
      }
      console.log('intervalo');
    }, ONE_SECOND);
    const { indexQuestion, round } = this.state;
    const { rounds } = this.props;
    if (round.length === 0) {
      const result = this.randomAnswer(rounds[indexQuestion]);
      this.setRoundState(result);
    }
  }

  componentDidUpdate() {
    const { chronometer, isEnabled } = this.state;
    if (isEnabled && chronometer === 0) {
      this.updateIsEnabled();
      clearInterval(this.chronometerId);
    }
  }

  setRoundState(result) {
    this.setState({
      round: result,
      loading: false,
    });
  }

  updateIsEnabled() {
    this.setState({
      isEnabled: false,
    });
  }

  endRound() {
    this.updateIsEnabled();
    clearInterval(this.chronometerId);
  }

  nextRound() {
    const { indexQuestion, round } = this.state;
    const { rounds } = this.props;
    if (round.length === 0) {
      const result = this.randomAnswer(rounds[indexQuestion]);
      this.setRoundState(result);
    }
  }

  randomAnswer(question) {
    const correctAnswer = question.correct_answer;
    const incorrectAnswers = question.incorrect_answers;
    const incorrect = incorrectAnswers.map((answer, index) => ({ answer, index }));
    const inicialAnswer = [...incorrect, { answer: correctAnswer, index: -1 }];
    return this.shuffle(this.shuffle(this.shuffle(inicialAnswer)));
  }

  shuffle(array) {
    const NUMBER = array.length;
    const arrayCopy = array;
    const random = arrayCopy.splice(Math.floor(Math.random() * NUMBER));
    return [...random, ...arrayCopy];
  }

  render() {
    const { name, avatar, score, rounds } = this.props;
    const { indexQuestion, isEnabled, chronometer, round, loading } = this.state;
    const { category, question } = rounds[indexQuestion];
    return (
      <div className="page-body">
        <div className="game-body">
          <div className="game-column"><img src={ arabesco } alt="Arabesco" /></div>
          <div className="game-column-center">
            <Header
              name={ name }
              avatar={ avatar }
              score={ score }
            />
            <h1>
              { chronometer }
            </h1>
            <div className="game-main">
              {
                rounds[indexQuestion].type === 'multiple'
                  ? !loading
                    && <Multiple
                      currentQuestion={ round }
                      category={ category }
                      question={ question }
                      isEnabled={ isEnabled }
                      endRound={ this.endRound }
                      nextRound={ this.nextRound }
                    />
                  : !loading
                    && <Boolean
                      currentQuestion={ round }
                      category={ category }
                      question={ question }
                      isEnabled={ isEnabled }
                      endRound={ this.endRound }
                      nextRound={ this.nextRound }
                    />
              }
            </div>
            {/* <button type="button" onClick={ () => this.endRound() }>
              Teste
            </button> */}
          </div>
          <div className="game-column"><img src={ arabesco } alt="Arabesco" /></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (
  { player: { playerInfo: { name, avatar }, score }, game: { rounds } },
) => ({
  name, avatar, score, rounds,
});

Game.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  rounds: PropTypes.arrayOf({}).isRequired,
};

export default connect(mapStateToProps)(Game);
