"use client"

import { useQuery } from "@apollo/client"
import { usePokemonStore } from "@/lib/store"
import { GET_POKEMON_LIST } from "@/lib/graphql/queries"
import { FavoritesComponent } from "../component/FavoritesComponent"

export function FavoritesContainer() {
    const { favoritePokemon } = usePokemonStore()

    const { data, loading, error } = useQuery(GET_POKEMON_LIST, {
        variables: {
            limit: 1000,
            offset: 0,
            where: favoritePokemon.length > 0 ? {
                id: { _in: favoritePokemon },
            } : { id: { _eq: -1 } },
        },
        skip: favoritePokemon.length === 0,
    })

    return (
        <FavoritesComponent
            favoritePokemon={favoritePokemon}
            loading={loading}
            error={error}
            pokemon={data?.pokemon_v2_pokemon || []}
        />
    )
} 