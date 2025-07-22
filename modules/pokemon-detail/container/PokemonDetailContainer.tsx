"use client"

import { useQuery } from "@apollo/client"
import { GET_POKEMON_DETAIL } from "@/lib/graphql/queries"
import { usePokemonStore } from "@/lib/store"
import { useState } from "react"
import { PokemonDetailComponent } from "../component/PokemonDetailComponent"

interface PokemonDetailContainerProps {
    pokemonId: number
}

export function PokemonDetailContainer({ pokemonId }: PokemonDetailContainerProps) {
    const {
        favoritePokemon,
        toggleFavorite,
        comparisonPokemon,
        addToComparison,
        removeFromComparison
    } = usePokemonStore()

    const [imageError, setImageError] = useState(false)

    const { data, loading, error } = useQuery(GET_POKEMON_DETAIL, {
        variables: { id: pokemonId },
    })

    const pokemon = data?.pokemon_v2_pokemon_by_pk

    if (!pokemon && !loading && !error) {
        return null
    }

    const isFavorite = pokemon ? favoritePokemon.includes(pokemon.id) : false
    const isInComparison = pokemon ? comparisonPokemon.some(p => p.id === pokemon.id) : false
    const canAddToComparison = comparisonPokemon.length < 4

    const pokemonImageUrl = imageError
        ? `/placeholder.svg?height=400&width=400&text=${pokemon?.name || 'Pokemon'}`
        : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`

    const maxStat = pokemon ? Math.max(...pokemon.pokemon_v2_pokemonstats.map((stat: any) => stat.base_stat)) : 0

    const handleToggleFavorite = () => {
        if (pokemon) {
            toggleFavorite(pokemon.id)
        }
    }

    const handleToggleComparison = () => {
        if (pokemon) {
            if (isInComparison) {
                removeFromComparison(pokemon.id)
            } else if (canAddToComparison) {
                addToComparison(pokemon)
            }
        }
    }

    return (
        <PokemonDetailComponent
            pokemon={pokemon}
            loading={loading}
            error={error}
            isFavorite={isFavorite}
            isInComparison={isInComparison}
            canAddToComparison={canAddToComparison}
            pokemonImageUrl={pokemonImageUrl}
            maxStat={maxStat}
            onToggleFavorite={handleToggleFavorite}
            onToggleComparison={handleToggleComparison}
            onImageError={() => setImageError(true)}
        />
    )
} 