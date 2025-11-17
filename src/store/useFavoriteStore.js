import { create } from 'zustand';

export const useFavoriteStore = create((set) => ({
    favorites: [],
    setFavorites: (favorites) => set({ favorites }),
}));
