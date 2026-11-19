import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addGame } from '../Redux/gamesSlice';

function AddGame() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    platform: '',
    price: '',
    image: '',
  });

  const [message, setMessage] = useState('');
  const [imgError, setImgError] = useState(false);

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

    const fallbackImage = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80';

    const newGame = {
      id: Date.now(),
      title: formData.title.trim(),
      genre: formData.genre.trim(),
      platform: formData.platform.trim(),
      price: parseFloat(formData.price) || 0,
      image: formData.image.trim() || fallbackImage,
    };

    dispatch(addGame(newGame));

    setMessage(`Le jeu "${newGame.title}" a été ajouté avec succès !`);
    setFormData({
      title: '',
      genre: '',
      platform: '',
      price: '',
      image: '',
    });
    setImgError(false);

    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="card form-card">
      <h2 className="form-title">Ajouter un nouveau jeu</h2>

      {message && <div className="alert alert-success">{message}</div>}

      <form onSubmit={handleSubmit} className="game-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="add-title">Titre du jeu *</label>
            <input
              id="add-title"
              type="text"
              name="title"
              placeholder="Ex: Cyber Horizon"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-genre">Genre *</label>
            <input
              id="add-genre"
              type="text"
              name="genre"
              placeholder="Ex: Action / RPG"
              value={formData.genre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-platform">Plateforme *</label>
            <input
              id="add-platform"
              type="text"
              name="platform"
              placeholder="Ex: PC, PS5, Xbox"
              value={formData.platform}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-price">Prix (€) *</label>
            <input
              id="add-price"
              type="number"
              step="0.01"
              min="0"
              name="price"
              placeholder="Ex: 59.99"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="add-image">URL de l'image (depuis Google / le Web)</label>
            <input
              id="add-image"
              type="url"
              name="image"
              placeholder="Collez ici l'URL publique de l'image (https://...)"
              value={formData.image}
              onChange={handleChange}
            />
            <small className="help-text">
              Copiez l'adresse d'une image sur Google (clic droit &gt; "Copier l'adresse de l'image") et collez-la ici.
            </small>

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
            Ajouter le jeu
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddGame;
