import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import Button from '../Button';
import {
  changeVisibility,
  fetchAPIThunk,
  getSeconds as getSecondsAction,
  setIsClicked,
  toggleStatusCronometer,
  updateAssertions as updateAssertionsAction,
  updateScore as updateScoreAction,
} from '../../Redux/Action';
import '../../Styles/trivia.css';
import { updateAssertionsAndScore } from '../../helpers/localStorage';

let assertion = 0;
const MAX_INDEX = 4;
class Multiple extends Component {
  constructor() {
    super();

    this.state = {
      index: 0,
      redirect: false,
    };

    this.renderQuestionAndAnswers = this.renderQuestionAndAnswers.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.changeQuestion = this.changeQuestion.bind(this);
    this.requestAPI = this.requestAPI.bind(this);
  }

  componentDidMount() {
    this.requestAPI();
  }

  requestAPI() {
    const { fetchAPI, token } = this.props;
    fetchAPI(token);
  }

  handleClick({ target: { id } }) {
    const {
      toggleDisabled,
      toggleVisibility,
      result,
      updateAssertions,
      stopCronometer,
    } = this.props;
    const { index } = this.state;
    toggleDisabled();
    toggleVisibility();
    if (id === 'correct-answer') {
      const TEN = 10;
      const { updateScore, seconds } = this.props;
      const { difficultyLevel } = result[index];
      updateAssertionsAndScore(difficultyLevel, seconds);
      const score = 0;
      const totalScore = score + (TEN + (difficultyLevel * seconds));
      assertion += 1;
      updateScore(totalScore);
      updateAssertions(assertion);
    }
    stopCronometer('off');
  }

  changeQuestion() {
    const {
      toggleDisabled,
      toggleVisibility,
      stopCronometer,
      getSeconds,
    } = this.props;
    const { index } = this.state;
    const THIRTY = 30;
    if (index < MAX_INDEX) {
      this.setState((prevState) => ({
        index: prevState.index + 1,
      }));
    } else {
      this.setState({ redirect: true });
    }
    toggleVisibility();
    toggleDisabled();
    stopCronometer('on');
    getSeconds(THIRTY);
  }

  renderQuestionAndAnswers() {
    const { isClicked, result } = this.props;
    const { index } = this.state;

    if (result.length) {
      const { category, question, answers, correctAnswer } = result[index];
      const correct = answers.find((text) => text === correctAnswer);
      return (
        <>
          <p data-testid="question-category">{category}</p>
          <p data-testid="question-text">{question}</p>
          { answers.map((answer, mapIndex) => (
            correct === answer
              ? (
                <Button
                  key={ mapIndex }
                  text={ correct }
                  id="correct-answer"
                  dataTest="correct-answer"
                  onClick={ this.handleClick }
                  disabled={ isClicked }
                />
              )
              : (
                <Button
                  key={ mapIndex }
                  text={ answer }
                  id="wrong-answer"
                  dataTest={ `wrong-answer-${index}` }
                  onClick={ this.handleClick }
                  disabled={ isClicked }
                />
              )
          )) }
        </>
      );
    }
  }

  render() {
    const { loading, isVisible } = this.props;
    const { redirect } = this.state;
    if (loading) {
      return (
        <p>Carregando...</p>
      );
    }
    if (redirect) return <Redirect to="/feedback" />;
    return (
      <>
        { this.renderQuestionAndAnswers() }
        { isVisible
        && <Button
          text="Próxima"
          dataTest="btn-next"
          onClick={ this.changeQuestion }
        />}
      </>
    );
  }
}

Multiple.propTypes = {
  token: PropTypes.string,
}.isRequired;

const mapStateToProps = ({ user, trivia, timer }) => ({
  token: user.token,
  isClicked: trivia.isClicked,
  result: trivia.result,
  isVisible: trivia.isVisible,
  loading: trivia.loading,
  seconds: timer.seconds,
});

const mapDispatchToProps = (dispatch) => ({
  toggleDisabled: () => dispatch(setIsClicked()),
  fetchAPI: (token) => dispatch(fetchAPIThunk(token)),
  toggleVisibility: () => dispatch(changeVisibility()),
  updateScore: (score) => dispatch(updateScoreAction(score)),
  updateAssertions: (assertions) => dispatch(updateAssertionsAction(assertions)),
  stopCronometer: (status) => dispatch(toggleStatusCronometer(status)),
  getSeconds: (seconds) => dispatch(getSecondsAction(seconds)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Multiple);
