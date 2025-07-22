import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  base_experience: number
  pokemon_v2_pokemontypes: Array<{
    pokemon_v2_type: {
      name: string
    }
  }>
  pokemon_v2_pokemonstats: Array<{
    base_stat: number
    pokemon_v2_stat: {
      name: string
    }
  }>
  pokemon_v2_pokemonspecy: {
    pokemon_v2_generation: {
      name: string
    }
  }
}

interface PokemonStore {
  searchQuery: string
  selectedTypes: string[]
  selectedGeneration: string
  sortBy: string
  sortOrder: "asc" | "desc"
  comparisonPokemon: Pokemon[]
  favoritePokemon: number[]
  setSearchQuery: (query: string) => void
  setSelectedTypes: (types: string[]) => void
  setSelectedGeneration: (generation: string) => void
  setSortBy: (sortBy: string) => void
  setSortOrder: (order: "asc" | "desc") => void
  addToComparison: (pokemon: Pokemon) => void
  removeFromComparison: (pokemonId: number) => void
  clearComparison: () => void
  toggleFavorite: (pokemonId: number) => void
}

export const usePokemonStore = create<PokemonStore>()(
  persist(
    (set, get) => ({
      searchQuery: "",
      selectedTypes: [],
      selectedGeneration: "",
      sortBy: "id",
      sortOrder: "asc",
      comparisonPokemon: [],
      favoritePokemon: [],
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedTypes: (types) => set({ selectedTypes: types }),
      setSelectedGeneration: (generation) => set({ selectedGeneration: generation }),
      setSortBy: (sortBy) => set({ sortBy }),
      setSortOrder: (order) => set({ sortOrder: order }),
      addToComparison: (pokemon) => {
        const { comparisonPokemon } = get()
        if (comparisonPokemon.length < 4 && !comparisonPokemon.find((p) => p.id === pokemon.id)) {
          set({ comparisonPokemon: [...comparisonPokemon, pokemon] })
        }
      },
      removeFromComparison: (pokemonId) => {
        const { comparisonPokemon } = get()
        set({ comparisonPokemon: comparisonPokemon.filter((p) => p.id !== pokemonId) })
      },
      clearComparison: () => set({ comparisonPokemon: [] }),
      toggleFavorite: (pokemonId) => {
        const { favoritePokemon } = get()
        const isFavorite = favoritePokemon.includes(pokemonId)
        if (isFavorite) {
          set({ favoritePokemon: favoritePokemon.filter((id) => id !== pokemonId) })
        } else {
          set({ favoritePokemon: [...favoritePokemon, pokemonId] })
        }
      },
    }),
    {
      name: "pokemon-store",
      partialize: (state) => ({
        comparisonPokemon: state.comparisonPokemon,
        favoritePokemon: state.favoritePokemon,
      }),
    },
  ),
)
