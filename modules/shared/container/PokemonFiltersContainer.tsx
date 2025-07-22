"use client"

import { useQuery } from "@apollo/client"
import { usePokemonStore } from "@/lib/store"
import { GET_POKEMON_TYPES, GET_GENERATIONS } from "@/lib/graphql/queries"
import { useState } from "react"
import { PokemonFiltersComponent } from "../component/PokemonFiltersComponent"

export function PokemonFiltersContainer() {
    const [isOpen, setIsOpen] = useState(false)
    const {
        searchQuery,
        selectedTypes,
        selectedGeneration,
        sortBy,
        sortOrder,
        setSearchQuery,
        setSelectedTypes,
        setSelectedGeneration,
        setSortBy,
        setSortOrder,
    } = usePokemonStore()

    const { data: typesData } = useQuery(GET_POKEMON_TYPES)
    const { data: generationsData } = useQuery(GET_GENERATIONS)

    const handleTypeToggle = (typeName: string) => {
        if (selectedTypes.includes(typeName)) {
            setSelectedTypes(selectedTypes.filter((t) => t !== typeName))
        } else {
            setSelectedTypes([...selectedTypes, typeName])
        }
    }

    const clearAllFilters = () => {
        setSearchQuery("")
        setSelectedTypes([])
        setSelectedGeneration("")
        setSortBy("id")
        setSortOrder("asc")
    }

    const handleSortChange = (value: string) => {
        const [newSortBy, newSortOrder] = value.split("-")
        setSortBy(newSortBy)
        setSortOrder(newSortOrder as "asc" | "desc")
    }

    const hasActiveFilters = searchQuery || selectedTypes.length > 0 || selectedGeneration

    return (
        <PokemonFiltersComponent
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            selectedTypes={selectedTypes}
            onTypeToggle={handleTypeToggle}
            selectedGeneration={selectedGeneration}
            onGenerationChange={setSelectedGeneration}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
            hasActiveFilters={hasActiveFilters}
            onClearAllFilters={clearAllFilters}
            typesData={typesData}
            generationsData={generationsData}
        />
    )
} 