import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteGame } from '../Redux/gamesSlice';

function GameCard({ game, onEdit }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm(`Supprimer "${game.title}" ?`)) {
      dispatch(deleteGame(game.id));
    }
  };

  return (
    <div className="game-card">
      <div className="card-image-box">
        <img
          src={game.image}
          alt={game.title}
          className="game-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/400x500/e2e8f0/475569?text=' + encodeURIComponent(game.title);
          }}
        />
        <span className="game-badge">{Number(game.price).toFixed(2)} €</span>
      </div>

      <div className="card-body">
        <h3 className="game-title">{game.title}</h3>
        
        <div className="game-meta">
          <p><strong>Genre :</strong> {game.genre}</p>
          <p><strong>Plateforme :</strong> {game.platform}</p>
        </div>

        <div className="card-buttons">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => onEdit(game)}
          >
            Modifier
          </button>

          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
