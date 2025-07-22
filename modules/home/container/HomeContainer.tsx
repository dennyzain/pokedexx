"use client"

import { useState, useMemo } from "react"
import { useQuery } from "@apollo/client"
import { usePokemonStore } from "@/lib/store"
import { GET_POKEMON_LIST } from "@/lib/graphql/queries"
import { Pokemon } from "@/lib/store"
import { HomeComponent } from "../component/HomeComponent"

const POKEMON_PER_PAGE = 20

export function HomeContainer() {
    const [currentPage, setCurrentPage] = useState(1)
    const {
        searchQuery,
        selectedTypes,
        selectedGeneration,
        sortBy,
        sortOrder,
    } = usePokemonStore()

    const whereClause = useMemo(() => {
        const conditions: any = {}

        if (searchQuery.trim()) {
            conditions.name = { _ilike: `%${searchQuery.trim().toLowerCase()}%` }
        }

        if (selectedTypes.length > 0) {
            conditions.pokemon_v2_pokemontypes = {
                pokemon_v2_type: {
                    name: { _in: selectedTypes }
                }
            }
        }

        if (selectedGeneration && selectedGeneration !== "all") {
            conditions.pokemon_v2_pokemonspecy = {
                pokemon_v2_generation: {
                    name: { _eq: selectedGeneration }
                }
            }
        }

        return Object.keys(conditions).length > 0 ? conditions : undefined
    }, [searchQuery, selectedTypes, selectedGeneration])

    const { data, loading, error, fetchMore } = useQuery(GET_POKEMON_LIST, {
        variables: {
            limit: POKEMON_PER_PAGE,
            offset: 0,
            where: whereClause,
        },
        notifyOnNetworkStatusChange: true,
    })

    const sortedPokemon = useMemo(() => {
        if (!data?.pokemon_v2_pokemon) return []

        const pokemon = [...data.pokemon_v2_pokemon]

        return pokemon.sort((a: Pokemon, b: Pokemon) => {
            let aValue: any, bValue: any

            switch (sortBy) {
                case "name":
                    aValue = a.name
                    bValue = b.name
                    break
                case "height":
                    aValue = a.height
                    bValue = b.height
                    break
                case "weight":
                    aValue = a.weight
                    bValue = b.weight
                    break
                case "id":
                default:
                    aValue = a.id
                    bValue = b.id
                    break
            }

            if (sortOrder === "desc") {
                return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
            } else {
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
            }
        })
    }, [data?.pokemon_v2_pokemon, sortBy, sortOrder])

    const loadMore = () => {
        fetchMore({
            variables: {
                offset: data?.pokemon_v2_pokemon.length || 0,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev
                return {
                    pokemon_v2_pokemon: [
                        ...prev.pokemon_v2_pokemon,
                        ...fetchMoreResult.pokemon_v2_pokemon,
                    ],
                }
            },
        })
    }

    return (
        <HomeComponent
            loading={loading}
            error={error}
            sortedPokemon={sortedPokemon}
            loadMore={loadMore}
            canLoadMore={data?.pokemon_v2_pokemon.length === POKEMON_PER_PAGE}
            pokemonPerPage={POKEMON_PER_PAGE}
        />
    )
} 