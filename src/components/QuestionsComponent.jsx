import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import './Questions.css';
import { Link } from 'react-router-dom';
import ConfigButton from './ConfigButton';
import { setCorrects } from '../redux/actions/index';

class QuestionsComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      answerSelected: false,
      answersCorrects: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClickCorrect = this.handleClickCorrect.bind(this);
  }

  handleClick() {
    this.setState({
      answerSelected: true,
    });
  }

  handleClickCorrect() {
    const { setAnswerCorrects } = this.props;
    const { answersCorrects } = this.state;
    // this.setState({
    //   answerSelected: true,
    //   answersCorrects: answersCorrects + 1,
    // });
    this.setState((prevstate) => ({ answersCorrects: prevstate.answersCorrects + 1 }));
    console.log(answersCorrects);
    setAnswerCorrects(answersCorrects);
  }

  render() {
    const { questions } = this.props;
    const { answerSelected } = this.state;
    return (
      <div>
        <fieldset>
          <h1 data-testid="question-category">
            { questions[0].category }
          </h1>
          <h2 data-testid="question-text">
            { questions[0].question }
          </h2>
          <ol>
            <li classNme="incorrect">
              {(questions[0].incorrect_answers).map((incorrect, index) => (
                <ConfigButton
                  key={ index }
                  className={ answerSelected && 'incorrect' }
                  test={ `wrong-answer-${index}` }
                  name={ incorrect }
                  onClick={ this.handleClick }
                />
              ))}
            </li>
            <li>
              <ConfigButton
                className={ answerSelected && 'correct' }
                test="correct-answer"
                onClick={ this.handleClickCorrect }
                name={ questions[0].correct_answer }
              />
            </li>
          </ol>
        </fieldset>
        <Link to="/feedback">FeedBack</Link>
      </div>
    );
  }
}

QuestionsComponent.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  setCorrects: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  setAnswerCorrects: (payload) => dispatch(setCorrects(payload)),
});

export default connect(null, mapDispatchToProps)(QuestionsComponent);
