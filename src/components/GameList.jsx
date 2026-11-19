import React from 'react';
import { useSelector } from 'react-redux';
import GameCard from './GameCard';

function GameList({ onEditGame }) {
  const games = useSelector((state) => state.games);

  return (
    <section className="catalog-section">
      <div className="catalog-header">
        <h2>Catalogue des jeux ({games.length})</h2>
      </div>

      {games.length === 0 ? (
        <div className="empty-message">
          <p>Aucun jeu dans la bibliothèque.</p>
        </div>
      ) : (
        <div className="games-grid">
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onEdit={onEditGame}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default GameList;
