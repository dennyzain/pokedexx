"use client"

import { usePokemonStore } from "@/lib/store"
import { Pokemon } from "@/lib/store"
import { useState } from "react"
import { PokemonCardComponent } from "../component/PokemonCardComponent"

interface PokemonCardContainerProps {
    pokemon: Pokemon
}

export function PokemonCardContainer({ pokemon }: PokemonCardContainerProps) {
    const {
        favoritePokemon,
        toggleFavorite,
        comparisonPokemon,
        addToComparison,
        removeFromComparison
    } = usePokemonStore()

    const [imageError, setImageError] = useState(false)
    const isFavorite = favoritePokemon.includes(pokemon.id)
    const isInComparison = comparisonPokemon.some(p => p.id === pokemon.id)
    const canAddToComparison = comparisonPokemon.length < 4

    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        toggleFavorite(pokemon.id)
    }

    const handleToggleComparison = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (isInComparison) {
            removeFromComparison(pokemon.id)
        } else if (canAddToComparison) {
            addToComparison(pokemon)
        }
    }

    const pokemonImageUrl = imageError
        ? `/placeholder.svg?height=200&width=200&text=${pokemon.name}`
        : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`

    return (
        <PokemonCardComponent
            pokemon={pokemon}
            isFavorite={isFavorite}
            isInComparison={isInComparison}
            canAddToComparison={canAddToComparison}
            pokemonImageUrl={pokemonImageUrl}
            onToggleFavorite={handleToggleFavorite}
            onToggleComparison={handleToggleComparison}
            onImageError={() => setImageError(true)}
        />
    )
} 