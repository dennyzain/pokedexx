"use client"

import { Input } from "@/components/ui/input"
import { PokemonCard } from "@/modules/shared/component/PokemonCard"
import { Skeleton } from "@/components/ui/skeleton"
import { Search } from 'lucide-react'
import { ApolloError } from "@apollo/client"

interface SearchComponentProps {
    searchQuery: string
    onSearchQueryChange: (query: string) => void
    loading: boolean
    error: ApolloError | undefined
    pokemon: any[]
}

export function SearchComponent({
    searchQuery,
    onSearchQueryChange,
    loading,
    error,
    pokemon
}: SearchComponentProps) {
    return (
        <div className="space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold flex items-center justify-center">
                    <Search className="mr-3 h-8 w-8" />
                    Search Pokemon
                </h1>
                <p className="text-muted-foreground">Find your favorite Pokemon by name</p>
            </div>

            <div className="max-w-md mx-auto relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                    placeholder="Enter Pokemon name..."
                    value={searchQuery}
                    onChange={(e) => onSearchQueryChange(e.target.value)}
                    className="pl-10 h-12 text-base"
                />
            </div>

            {!searchQuery.trim() ? (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <p className="text-muted-foreground">Start typing to search for Pokemon</p>
                </div>
            ) : loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="space-y-4">
                            <Skeleton className="h-48 w-full rounded-lg" />
                            <Skeleton className="h-4 w-3/4 mx-auto" />
                            <Skeleton className="h-4 w-1/2 mx-auto" />
                        </div>
                    ))}
                </div>
            ) : error ? (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">❌</div>
                    <p className="text-destructive">Error searching Pokemon: {error.message}</p>
                </div>
            ) : pokemon.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">😢</div>
                    <p className="text-muted-foreground">No Pokemon found matching "{searchQuery}"</p>
                    <p className="text-sm text-muted-foreground mt-2">Try searching for names like "pikachu", "charizard", or "bulbasaur"</p>
                </div>
            ) : (
                <div className="space-y-4">
                    <p className="text-muted-foreground text-center">
                        Found {pokemon.length} Pokemon matching "{searchQuery}"
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {pokemon.map((pokemon: any) => (
                            <PokemonCard key={pokemon.id} pokemon={pokemon} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
} 