import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Timer from '../Components/Timer';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      actualQuestion: 0,
      questionsLoaded: false,
      disabled: false,
      answered: false,
      buttonShow: false,
      right: false,
    };
    this.switchButton = this.switchButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.callButton = this.callButton.bind(this);
    this.alternatives = this.alternatives.bind(this);
  }

  componentDidMount() {
    this.getQuestion();
  }

  getQuestion() {
    const myToken = localStorage.getItem('token');
    const URL = `https://opentdb.com/api.php?amount=5&encode=base64&token=${myToken}`;
    fetch(URL)
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          questions: result.results,
          questionsLoaded: true,
        });
      });
  }

  switchButton() {
    this.setState((previousState) => ({
      disabled: !previousState.disabled,
      buttonShow: true,
    }));
  }

  callButton() {
    this.handleClick();
    this.setState({
      disabled: true,
    });
  }

  handleClick() {
    this.setState({
      answered: true,
      buttonShow: true,
    });
  }

  alternatives() {
    const { questions, actualQuestion, questionsLoaded, answered, disabled } = this.state;
    let wrongAnswers = [];
    if (questionsLoaded) {
      wrongAnswers = questions[actualQuestion].incorrect_answers
        .map((answer, index) => (
          <li key={ index }>
            <button
              data-testid={ `wrong-answer-${index}` }
              disabled={ disabled }
              type="button"
              className={ answered ? 'wrong' : 'alternative' }
              onClick={ async () => {
                await this.setState({
                  right: false,
                });
                this.callButton();
              } }
            >
              { questionsLoaded && this.b64toutf8(answer) }
            </button>
          </li>
        ));
    }
    return (
      [
        ...wrongAnswers,
        (
          <li key="4">
            <button
              type="button"
              data-testid="correct-answer"
              className={ answered ? 'correct' : 'alternative' }
              onClick={ async () => {
                await this.setState({
                  right: true,
                });
                this.callButton();
              } }
              disabled={ disabled }
            >
              { questionsLoaded
               && this.b64toutf8(questions[actualQuestion].correct_answer) }
            </button>
          </li>
        ),
      ]
    );
  }

  // Função Obtida em: https://developer.mozilla.org/en-US/docs/Glossary/Base64
  b64toutf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
  }

  render() {
    const { questions, actualQuestion,
      questionsLoaded, buttonShow, disabled, right } = this.state;
    const mq = 4;
    const diff = questionsLoaded
      ? this.b64toutf8(questions[actualQuestion].difficulty) : '';
    const button = (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ () => {
          this.setState((prevState) => ({
            actualQuestion: prevState.actualQuestion + 1,
            answered: false,
            disabled: false,
            buttonShow: false,
          }));
        } }
      >
        Próxima Questão
      </button>
    );
    const feedbackButton = (<Link data-testid="btn-next" to="/feedback">Feedback</Link>);
    return questionsLoaded && (
      <div className="game-div">
        <Header />
        <div className="timer-div">
          { !disabled && <Timer sb={ this.switchButton } diff={ diff } right={ right } />}
        </div>
        <fieldset>
          <h1
            data-testid="question-category"
          >
            { questionsLoaded && this.b64toutf8(questions[actualQuestion].category) }
          </h1>
          <h2
            data-testid="question-text"
          >
            { questionsLoaded && this.b64toutf8(questions[actualQuestion].question) }
          </h2>
          <ul>
            {this.alternatives()}
          </ul>
          { buttonShow && (actualQuestion === mq ? feedbackButton : button) }
        </fieldset>
      </div>
    );
  }
}
// teste

export default Game;
