import React from 'react';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      picture: '',
      name: 'teste',
      score: 1,
    };
  }

  render() {
    const { picture, name, score } = this.state;

    return (
      <header>
        <img src={ picture } alt="foto de perfil" data-testid="header-profile-picture" />
        <h4 data-testid="header-player-name">{ name }</h4>
        <h6 data-testid="header-score">{ score }</h6>
      </header>
    );
  }
}

export default Feedback;
