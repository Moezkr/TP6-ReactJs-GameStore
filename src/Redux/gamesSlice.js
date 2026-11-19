import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: 1,
    title: 'Elden Ring',
    genre: 'Action RPG / Soulslike',
    platform: 'PC / PS5 / Xbox',
    price: 59.99,
    image: '/images/elden-ring.jpg',
  },
  {
    id: 2,
    title: 'Grand Theft Auto VI',
    genre: 'Action-Aventure',
    platform: 'PS5 / Xbox Series X',
    price: 69.99,
    image: '/images/gta-6.webp',
  },
  {
    id: 3,
    title: 'EA Sports FC 24',
    genre: 'Sport / Football',
    platform: 'PS5 / PS4 / PC',
    price: 49.99,
    image: '/images/fifa-24.jpg',
  },
  {
    id: 4,
    title: "Assassin's Creed Mirage",
    genre: 'Action-Aventure / Infiltration',
    platform: 'PS5 / Xbox / PC',
    price: 44.99,
    image: '/images/assassins-creed-mirage.webp',
  },
  {
    id: 5,
    title: 'Lies of P',
    genre: 'Soulslike / Dark Fantasy',
    platform: 'PC / PS5 / Xbox',
    price: 54.99,
    image: '/images/lies-of-p.webp',
  },
  {
    id: 6,
    title: "Marvel's Spider-Man 2",
    genre: 'Action-Aventure / Super-héros',
    platform: 'PS5',
    price: 69.99,
    image: '/images/spiderman-2.webp',
  },
];

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    addGame: (state, action) => {
      state.push(action.payload);
    },
    deleteGame: (state, action) => {
      return state.filter((game) => game.id !== action.payload);
    },
    updateGame: (state, action) => {
      const index = state.findIndex((game) => game.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addGame, deleteGame, updateGame } = gamesSlice.actions;
export default gamesSlice.reducer;
