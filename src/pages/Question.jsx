import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import fetchApi from '../services/api';
import QuestionsComponent from '../components/QuestionsComponent';

class Question extends Component {
  constructor(props) {
    super(props);
    this.handleEmailConversion = this.handleEmailConversion.bind(this);
    this.handleQuestions = this.handleQuestions.bind(this);
    this.timerQuestion = this.timerQuestion.bind(this);
    this.handleTime = this.handleTime.bind(this);

    this.state = {
      loading: true,
      timer: 30,
      disableButton: false,
    };
  }

  componentDidMount() {
    this.handleQuestions();
    this.timerQuestion();
  }

  handleEmailConversion() {
    const { gravatarEmail } = this.props;
    const emailHash = md5(gravatarEmail).toString();
    const response = `https://www.gravatar.com/avatar/${emailHash}`;
    return response;
  }

  handleTime() {
    this.setState((old) => ({ timer: old.timer - 1 }));
  }

  timerQuestion() {
    const maxTime = 1000;
    const timerInterval = setInterval(() => {
      const { timer } = this.state;
      this.handleTime();
      if (timer === 1) {
        clearInterval(timerInterval);
        this.setState({ disableButton: true });
      }
    }, maxTime);
  }

  async handleQuestions() {
    const { results } = await fetchApi('https://opentdb.com/api.php?amount=5');
    this.setState({
      resultsApi: results,
      loading: false,
    });
  }

  render() {
    const { name, score } = this.props;
    const { resultsApi, disableButton, timer, loading } = this.state;
    return (
      <>
        <header>
          <img
            src={ this.handleEmailConversion() }
            alt="avatar"
            data-testid="header-profile-picture"
          />
          <h1>
            TEMPO:
            {timer}
          </h1>
          <h2 data-testid="header-player-name">{ name }</h2>
          <h3 data-testid="header-score">{ score }</h3>
        </header>
        {!loading && <QuestionsComponent
          question={ resultsApi }
          buttonDisable={ disableButton }
        />}
      </>
    );
  }
}

Question.propTypes = {
  gravatarEmail: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = ({ login }) => ({
  gravatarEmail: login.gravatarEmail,
  name: login.name,
  score: login.score,
});

export default connect(mapStateToProps, null)(Question);
