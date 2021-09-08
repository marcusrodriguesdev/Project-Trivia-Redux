import React from 'react';

import Header from '../components/Header';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: [],
    };

    this.fetchQuestions = this.fetchQuestions.bind(this);
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  fetchQuestions() {
    const token = localStorage.getItem('token');
    fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((res) => res.json())
      .then((data) => this.setState({ questions: data.results }));
  }

  render() {
    const { questions } = this.state;

    console.log(questions);

    return (
      <>
        <Header />
        <div className="game-page">
          <div className="questions-container">
            <h1 data-testid="question-category">CATEGORY</h1>
            <p data-testid="question-text">
              {questions[0] ? questions[0].question : '' }
            </p>
          </div>
          <div className="alternatives-container">
            {questions[0] ? (
              [questions[0].correct_answer, ...questions[0].incorrect_answers]
                .sort()
                .map((answer) => {
                  console.log(answer);
                  if (answer === questions[0].correct_answer) {
                    return <p key={ answer } data-testid="correct-answer">{answer}</p>;
                  }

                  return (
                    <p
                      key={ answer }
                      data-testid={
                        `wrong-answer-${
                          questions[0].incorrect_answers
                            .findIndex((el) => el === answer)}`
                      }
                    >
                      { answer }
                    </p>
                  );
                })
            ) : (
              <>
                <p data-testid="correct-answer"> </p>
                <p data-testid="wrong-answer-5"> </p>
              </>
            )}
            <button type="button">PRÓXIMA</button>
          </div>
        </div>
      </>
    );
  }
}

export default Game;
