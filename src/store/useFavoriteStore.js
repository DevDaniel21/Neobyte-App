import { create } from 'zustand'

export const useFavoriteStore = create((set) => ({
    favorites: [],
    setFavorites: (favoritesList) => set({ favorites: favoritesList }),
    addFavorite: (product) => set((state) => ({
        favorites: [...state.favorites, product]
    })),
    removeFavorite: (productId) => set((state) => ({
        favorites: state.favorites.filter(item => item.id !== productId)
    })),
    clearFavorites: () => set({ favorites: [] }),
}))
