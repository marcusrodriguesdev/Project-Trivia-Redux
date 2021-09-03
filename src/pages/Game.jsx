import React from 'react';
// import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const avatarPadrao = 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y';
const trivialink = 'https://opentdb.com/api.php?amount=5&token=';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: {},
      loading: true,
      countQuestion: 0,
    };

    this.getTriviaApiResponse = this.getTriviaApiResponse.bind(this);
  }

  componentDidMount() {
    this.getTriviaApiResponse();
  }

  async getTriviaApiResponse() {
    const token = localStorage.getItem('token');
    const responseApi = await fetch(`${trivialink}${token}`);
    const object = await responseApi.json();
    console.log(object);
    this.setState({
      questions: object,
      loading: false,
    });
  }

  render() {
    const { playerName } = this.props;
    const { questions, loading, countQuestion } = this.state;
    // const emailMD5 = md5(playerEmail).toString();

    if (loading) return <h1>Loading...</h1>;

    const questionTrivia = questions.results[countQuestion];
    const alternatives = [
      ...questionTrivia.incorrect_answers,
      questionTrivia.correct_answer,
    ];

    return (
      <div>
        <header>
          <p data-testid="header-player-name">{playerName}</p>
          <p data-testid="header-score">0</p>
          <img
            data-testid="header-profile-picture"
            src={ avatarPadrao }
            alt="Avatar"
          />
        </header>
        <div>
          <h2 data-testid="question-text">{questionTrivia.question}</h2>
          <span data-testid="question-category">{questionTrivia.category}</span>
          <div>
            {alternatives.map((alternative, index) => (
              <button type="button" key={ index }>
                {alternative}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  playerName: state.player.name,
  playerEmail: state.player.email,
});

Game.propTypes = {
  playerName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
