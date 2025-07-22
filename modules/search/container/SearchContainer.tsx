"use client"

import { useState, useEffect } from "react"
import { useQuery } from "@apollo/client"
import { GET_POKEMON_LIST } from "@/lib/graphql/queries"
import { useDebounce } from "@/hooks/use-debounce"
import { SearchComponent } from "../component/SearchComponent"

export function SearchContainer() {
    const [searchQuery, setSearchQuery] = useState("")
    const debouncedSearchQuery = useDebounce(searchQuery, 300)

    const { data, loading, error } = useQuery(GET_POKEMON_LIST, {
        variables: {
            limit: 100,
            offset: 0,
            where: debouncedSearchQuery.trim()
                ? {
                    name: { _ilike: `%${debouncedSearchQuery.trim().toLowerCase()}%` },
                }
                : { id: { _eq: -1 } },
        },
        skip: !debouncedSearchQuery.trim(),
    })

    return (
        <SearchComponent
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            loading={loading}
            error={error}
            pokemon={data?.pokemon_v2_pokemon || []}
        />
    )
} 