import React from 'react';

import Header from '../components/Header';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      isAnswered: false,
      isTimeOver: false,
      time: 30,
      countdown: {},
    };

    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.selectHandler = this.selectHandler.bind(this);
    this.interval = this.interval.bind(this);
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

  selectHandler() {
    this.setState({ isAnswered: true });
    // const { id } = e.target;
    // if (id === 'correct') e.target.style.border = '3px solid rgb(6, 240, 15)';
    // if (id === 'wrong') e.target.style.border = '3px solid rgb(255, 0, 0)';
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

  render() {
    const { questions, time, countdown, isTimeOver } = this.state;
    if (time === 0 && !isTimeOver) {
      clearInterval(countdown);
      this.setState({
        isTimeOver: true,
      });
    }

    return (
      <>
        <Header />
        <div className="game-page">
          <div className="questions-container">
            <h1 data-testid="question-category">CATEGORY</h1>
            <p data-testid="question-text">
              {questions[0] ? questions[0].question : '' }
            </p>
            <h2>
              { `TEMPO: ${time}` }
            </h2>
          </div>
          <div className="alternatives-container">
            {questions[0] ? (
              [questions[0].correct_answer, ...questions[0].incorrect_answers]
                .sort()
                .map((answer) => {
                  if (answer === questions[0].correct_answer) {
                    return this.renderAlternative(true, answer);
                  }
                  return this.renderAlternative(
                    false,
                    answer,
                    questions[0].incorrect_answers.findIndex((el) => el === answer),
                  );
                })
            ) : (
              <>
                { this.renderAlternative(true, ' ', 0) }
                { this.renderAlternative(false, ' ', 1) }
              </>
            )}
            <button type="button" className="submit">PRÓXIMA</button>
          </div>
        </div>
      </>
    );
  }
}

export default Game;
