import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Button from '../Components/Button';
import Header from '../Components/Header';
import Multiple from '../Components/Multiple';
import '../Styles/trivia.css';

class Trivia extends Component {
  constructor() {
    super();

    this.state = {
      isVisible: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.getRanking = this.getRanking.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  getRanking() {
    const { history } = this.props;

    history.push('/ranking');
  }

  nextQuestion() {
    this.renderQuestionAndAnswers();
  }

  handleClick() {
    this.setState({
      isVisible: true,
    });
  }

  render() {
    const { isVisible } = this.state;

    return (
      <div>
        <Header />
        <Multiple />
        { isVisible
        && <Button
          text="Próxima"
          dataTest="btn-next"
          onClick={ this.nextQuestion }
        />}
        <div>
          <Button
            text="Ver Ranking"
            id="btn-ranking"
            dataTest="btn-ranking"
            onClick={ this.getRanking }
          />
        </div>
      </div>
    );
  }
}

Trivia.propTypes = {
  token: PropTypes.string,
}.isRequired;

const mapStateToProps = ({ user }) => ({
  token: user.token,
});

export default connect(mapStateToProps)(Trivia);
