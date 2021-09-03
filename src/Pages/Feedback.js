import React from 'react';
import { Link } from 'react-router-dom';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        {/* Requisito 12 */}
        <header>
          <img src="" alt="Gravatar" data-testid="header-profile-picture" />
          <span data-testid="header-player-name">Nome do Jogador</span>
          <span data-testid="header-score">Placar</span>
        </header>

        {/* Requisito 13 Mensagem de feedback,
        "Podia ser melhor..." para <3,
        "Mandou bem!" para >- 3 hits */}
        <div>
          <span data-testud="feedback-text"> Podia ser melhor </span>
          <span data-testud="feedback-text"> Mandou bem! </span>
        </div>

        {/* Requisito 14 */}
        <div>
          <span data-testid="feedback-total-score">Placar Final</span>
          <span data-testid="feedback-total-question">Acertou x perguntas</span>
        </div>

        {/* Requisito 15 */}
        <Link to="/">
          <button type="button" data-testid="btn-play-again">Jogar novamente</button>
        </Link>

        {/* Requisito 16 */}
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">Ver Ranking</button>
        </Link>
      </div>
    );
  }
}

export default Feedback;
