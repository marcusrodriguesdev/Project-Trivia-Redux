import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchQuestions } from '../Services/api';

const CryptoJS = require('crypto-js');

class Trivia extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: {},
    };

    this.fetchAvatar = this.fetchAvatar.bind(this);
    this.fetchQuestions = this.fetchQuestions.bind(this);
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  async fetchQuestions() {
    const { token } = this.props;

    const questions = await fetchQuestions(token);

    this.setState({
      questions,
    });
  }

  fetchAvatar() {
    const { email } = this.props;
    const hashGerada = CryptoJS.MD5(email).toString();

    const fetchApi = (`https://www.gravatar.com/avatar/${hashGerada}`);

    return fetchApi;
  }

  render() {
    const { name } = this.props;
    const { questions } = this.state;

    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ this.fetchAvatar() }
            alt="Foto de perfil do Usuario"
          />
          <p>
            <span data-testid="header-player-name">{ name }</span>
            <span data-testid="header-score"> 0 </span>
          </p>
        </header>
        <main>
          <h1 data-testid="question-category">categoria</h1>
          <p data-testid="question-text">texto</p>
          <button type="submit">alternativas</button>
        </main>
      </div>
    );
  }
}

const mapStateToProps = ({ user: { email, name }, trivia: { token } }) => ({
  token,
  email,
  name,
});

Trivia.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Trivia);
