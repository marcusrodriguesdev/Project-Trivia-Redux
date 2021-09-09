import React from 'react';

import Header from '../components/Header';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      questionIndex: 0,
      isAnswered: false,
      assertions: 0,
      isTimeOver: false,
      time: 30,
      countdown: {},
      score: 0,
    };

    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.selectHandler = this.selectHandler.bind(this);
    this.interval = this.interval.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);
  }

  componentDidMount() {
    this.fetchQuestions();
    this.interval();
  }

  interval() {
    const interval = 1000;
    const countdown = setInterval(() => {
      this.setState((previousState) => ({
        time: previousState.time - 1,
      }));
    }, interval);
    this.setState({
      countdown,
    });
  }

  fetchQuestions() {
    const token = localStorage.getItem('token');
    fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((res) => res.json())
      .then((data) => this.setState({ questions: data.results }));
  }

  selectHandler(e) {
    const { questionIndex, questions, time } = this.state;
    let points;
    const HARD_POINT = 3;
    const TEN = 10;
    this.setState({ isAnswered: true });
    const { id } = e.target;
    if (id === 'wrong') return;
    if (questions.length > 0) {
      if (id === 'correct') {
        if (questions[questionIndex].difficulty === 'easy') {
          points = 1;
        } else if (questions[questionIndex].difficulty === 'medium') {
          points = 2;
        } else if (questions[questionIndex].difficulty === 'hard') {
          points = HARD_POINT;
        }
      }
    } else points = TEN;
    this.setState((prevState) => ({
      assertions: prevState.assertions + 1,
      score: prevState.score + TEN + (time * points),
    }));
  }

  renderAlternative(isCorrect, content, index = 1) {
    const { isAnswered, isTimeOver } = this.state;
    const style = isAnswered ? { border: isCorrect
      ? '3px solid rgb(6, 240, 15)' : '3px solid rgb(255, 0, 0)' } : {};
    return (
      <button
        id={ isCorrect ? 'correct' : 'wrong' }
        style={ style }
        className="alternative"
        disabled={ isTimeOver }
        onClick={ this.selectHandler }
        tabIndex={ 0 }
        type="button"
        onKeyDown={ (e) => console.log(e.key) }
        data-testid={ `${isCorrect ? 'correct-answer' : `wrong-answer${index}`}` }
      >
        { content }
      </button>
    );
  }

  renderButton() {
    return (
      <button
        data-testid="btn-next"
        type="button"
        className="submit"
        onClick={ () => this.setState((previState) => ({
          questionIndex: previState.questionIndex + 1,
        })) }
      >
        PRÓXIMA
      </button>
    );
  }

  renderQuestion() {
    const { time, countdown, isTimeOver, questions } = this.state;
    if (time === 0 && !isTimeOver) {
      clearInterval(countdown);
      this.setState({
        isTimeOver: true,
      });
    }
    return (
      <div className="questions-container">
        <h1 data-testid="question-category">CATEGORY</h1>
        <p data-testid="question-text">
          {questions[0] ? questions[0].question : '' }
        </p>
        <h2>
          { `TEMPO: ${time}` }
        </h2>
      </div>
    );
  }

  render() {
    const { questions, assertions, score, isAnswered, questionIndex } = this.state;
    return (
      <>
        <Header
          assertions={ assertions }
          score={ score }
        />
        <div className="game-page">
          { this.renderQuestion() }
          <div className="alternatives-container">
            {questions[questionIndex] ? (
              [questions[questionIndex].correct_answer,
                ...questions[questionIndex].incorrect_answers]
                .sort()
                .map((answer) => {
                  if (answer === questions[questionIndex].correct_answer) {
                    return this.renderAlternative(true, answer);
                  }
                  return this.renderAlternative(
                    false,
                    answer,
                    questions[questionIndex].incorrect_answers
                      .findIndex((el) => el === answer),
                  );
                })
            ) : (
              <>
                { this.renderAlternative(true, ' ', questionIndex) }
                { this.renderAlternative(false, ' ', 1) }
              </>
            )}
            { isAnswered && this.renderButton()}
          </div>
        </div>
      </>
    );
  }
}

export default Game;
