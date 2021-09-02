import React, { Component } from 'react';
import fecthApiQuestion from '../services/fetchApiQuestions';

// import AnswerBoolean from '../components/AnswerBoolean';
// import AnswerMultiple from '../components/AnswerMultiple';

import '../styles/main.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
    this.requestApiQuestions = this.requestApiQuestions.bind(this);
  }

  componentDidMount() {
    this.requestApiQuestions();
  }

  async requestApiQuestions() {
    const getToken = localStorage.getItem('token');
    const token = JSON.parse(getToken);
    const data = await fecthApiQuestion(token);
    console.log(data.results);
    this.setState({
      results: data.results,
    });
  }

  render() {
    const { results } = this.state;
    console.log(results);
    return (
      <div className="main-content">
        <div className="question-box">
          <div className="container-question">
            <h2>tema da pergunta</h2>
            <h3>dificuldade da pergunta</h3>
            <p>pergunta</p>
          </div>
          <div className="question-answers">
            {/* <AnswerBoolean answers={} />
            <AnswerMultiple answers={} /> */}
          </div>
        </div>

        <div className="box-buttons">
          <button
            type="button"
          >
            Próximas
          </button>
        </div>
      </div>
    );
  }
}

export default Game;
