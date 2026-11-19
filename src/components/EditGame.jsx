import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateGame } from '../Redux/gamesSlice';

function EditGame({ gameToEdit, onCancel }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    genre: '',
    platform: '',
    price: '',
    image: '',
  });

  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (gameToEdit) {
      setFormData({
        id: gameToEdit.id,
        title: gameToEdit.title || '',
        genre: gameToEdit.genre || '',
        platform: gameToEdit.platform || '',
        price: gameToEdit.price !== undefined ? gameToEdit.price : '',
        image: gameToEdit.image || '',
      });
      setImgError(false);
    }
  }, [gameToEdit]);

  if (!gameToEdit) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'image') {
      setImgError(false);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.genre || !formData.platform || !formData.price) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const updatedGame = {
      id: formData.id,
      title: formData.title.trim(),
      genre: formData.genre.trim(),
      platform: formData.platform.trim(),
      price: parseFloat(formData.price) || 0,
      image: formData.image.trim() || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    };

    dispatch(updateGame(updatedGame));

    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="card form-card edit-card">
      <div className="form-header">
        <h2 className="form-title">Modifier le jeu : {gameToEdit.title}</h2>
        <button
          type="button"
          className="btn-icon"
          onClick={onCancel}
          title="Fermer"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="game-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="edit-title">Titre du jeu *</label>
            <input
              id="edit-title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-genre">Genre *</label>
            <input
              id="edit-genre"
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-platform">Plateforme *</label>
            <input
              id="edit-platform"
              type="text"
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-price">Prix (€) *</label>
            <input
              id="edit-price"
              type="number"
              step="0.01"
              min="0"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="edit-image">URL de l'image (depuis Google / le Web)</label>
            <input
              id="edit-image"
              type="text"
              name="image"
              placeholder="Collez l'URL de l'image"
              value={formData.image}
              onChange={handleChange}
            />

            {formData.image && (
              <div className="image-preview-container">
                <p className="preview-label">Aperçu :</p>
                {imgError ? (
                  <p className="preview-error">⚠️ Impossible de charger cette URL d'image.</p>
                ) : (
                  <img
                    src={formData.image}
                    alt="Aperçu"
                    className="image-preview"
                    onError={() => setImgError(true)}
                  />
                )}
              </div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Enregistrer
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditGame;
