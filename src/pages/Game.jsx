import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchTrivia from '../services/fetchTrivia';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trivia: [],
      index: 0,
      isLoading: true,
    };

    this.fetchTriviaGame = this.fetchTriviaGame.bind(this);
    this.teste = this.teste.bind(this);
  }

  componentDidMount() {
    this.fetchTriviaGame();
  }

  async fetchTriviaGame() {
    const { endpoint, token } = this.props;
    const response = await fetchTrivia(endpoint, token);
    console.log(response);
    this.setState({
      trivia: [...response],
      isLoading: false,
    });
  }

  teste() {
    const { trivia, index, isLoading } = this.state;
    return isLoading ? <p>Loading...</p> : <p>{trivia[index].category}</p>;
  }

  render() {
    const { name, image } = this.props;
    return (
      <>
        <header>
          <img src={ image } alt="user" data-testid="header-profile-picture" />
          <p data-testid="header-player-name">{name}</p>
          <p data-testid="header-score">Placar: 0</p>
        </header>

        <section>
          { this.teste() }

        </section>
      </>
    );
  }
}

Game.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.reducer.name,
  image: state.reducer.image,
  token: state.reducer.token,
  endpoint: state.reducer.endpoint,
});

export default connect(mapStateToProps)(Game);
