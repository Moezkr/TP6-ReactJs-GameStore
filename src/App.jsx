import React, { useState, useEffect, useRef } from 'react';
import GameList from './components/GameList';
import AddGame from './components/AddGame';
import EditGame from './components/EditGame';

function App() {
  const [gameToEdit, setGameToEdit] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });

  const editSectionRef = useRef(null);

  useEffect(() => {
    const theme = darkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [darkMode]);

  const handleEditClick = (game) => {
    setGameToEdit(game);
    setShowAddForm(false);
    setTimeout(() => {
      if (editSectionRef.current) {
        editSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleCloseEdit = () => {
    setGameToEdit(null);
  };

  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="header-container">
          <div className="brand">
            <span className="brand-icon">🎮</span>
            <div>
              <h1 className="brand-title">Game Library</h1>
            </div>
          </div>

          <div className="header-actions">
            <button
              type="button"
              className="btn btn-theme"
              onClick={() => setDarkMode(!darkMode)}
              title="Changer de thème"
            >
              {darkMode ? '☀️ Mode Clair' : '🌙 Mode Sombre'}
            </button>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setShowAddForm(!showAddForm);
                if (gameToEdit) setGameToEdit(null);
              }}
            >
              {showAddForm ? '✕ Fermer' : '➕ Nouveau Jeu'}
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        {gameToEdit && (
          <div ref={editSectionRef} className="form-wrapper">
            <EditGame
              gameToEdit={gameToEdit}
              onCancel={handleCloseEdit}
            />
          </div>
        )}

        {showAddForm && (
          <div className="form-wrapper">
            <AddGame />
          </div>
        )}

        <GameList onEditGame={handleEditClick} />
      </main>

      <footer className="app-footer">
        <p>© 2026 Game Library. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
