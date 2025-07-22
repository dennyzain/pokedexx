"use client"

import { usePokemonStore } from "@/lib/store"
import { ComparisonComponent } from "../component/ComparisonComponent"

export function ComparisonContainer() {
    const { comparisonPokemon, clearComparison } = usePokemonStore()

    const allStats = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed']

    const getStatValue = (pokemon: any, statName: string) => {
        const stat = pokemon.pokemon_v2_pokemonstats.find(
            (s: any) => s.pokemon_v2_stat.name === statName
        )
        return stat ? stat.base_stat : 0
    }

    const getMaxStatValue = (statName: string) => {
        return Math.max(...comparisonPokemon.map(pokemon => getStatValue(pokemon, statName)))
    }

    return (
        <ComparisonComponent
            comparisonPokemon={comparisonPokemon}
            onClearComparison={clearComparison}
            allStats={allStats}
            getStatValue={getStatValue}
            getMaxStatValue={getMaxStatValue}
        />
    )
} 