"use client"

import { PokemonCard } from "@/modules/shared/component/PokemonCard"
import { PokemonFilters } from "@/modules/shared/component/PokemonFilters"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Pokemon } from "@/lib/store"
import { Sparkles, Zap, Star } from 'lucide-react'
import { ApolloError } from "@apollo/client"

interface HomeComponentProps {
    loading: boolean
    error: ApolloError | undefined
    sortedPokemon: Pokemon[]
    loadMore: () => void
    canLoadMore: boolean
    pokemonPerPage: number
}

export function HomeComponent({
    loading,
    error,
    sortedPokemon,
    loadMore,
    canLoadMore,
    pokemonPerPage
}: HomeComponentProps) {
    if (error) {
        return (
            <div className="text-center py-12">
                <div className="text-6xl mb-4">❌</div>
                <h2 className="text-2xl font-bold mb-2">Oops! Something went wrong</h2>
                <p className="text-muted-foreground mb-4">Error loading Pokemon: {error.message}</p>
                <Button onClick={() => window.location.reload()}>
                    Try Again
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <div className="text-center py-12 relative decorative-bg">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <Sparkles className="absolute top-10 left-10 h-6 w-6 text-yellow-400 float-animation" />
                    <Zap className="absolute top-20 right-20 h-8 w-8 text-blue-500 bounce-gentle" />
                    <Star className="absolute bottom-20 left-20 h-5 w-5 text-purple-500 float-animation" />
                    <Sparkles className="absolute bottom-10 right-10 h-7 w-7 text-green-400 bounce-gentle" />
                </div>

                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-primary">
                    Your favorite Pokemon database.
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Explore the world of Pokemon with the most comprehensive database.
                    Search, filter, and discover your favorites!
                </p>
            </div>

            <PokemonFilters />
            {loading && sortedPokemon.length === 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {Array.from({ length: pokemonPerPage }).map((_, i) => (
                        <div key={i} className="space-y-4">
                            <Skeleton className="h-48 w-full rounded-lg" />
                            <Skeleton className="h-4 w-3/4 mx-auto" />
                            <Skeleton className="h-4 w-1/2 mx-auto" />
                        </div>
                    ))}
                </div>
            ) : sortedPokemon.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <h2 className="text-2xl font-bold mb-2">No Pokemon Found</h2>
                    <p className="text-muted-foreground">
                        Try adjusting your search or filter criteria
                    </p>
                </div>
            ) : (
                <>
                    <div className="flex justify-between items-center">
                        <p className="text-muted-foreground">
                            Showing {sortedPokemon.length} Pokemon
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {sortedPokemon.map((pokemon: Pokemon) => (
                            <PokemonCard key={pokemon.id} pokemon={pokemon} />
                        ))}
                    </div>

                    {canLoadMore && (
                        <div className="text-center">
                            <Button onClick={loadMore} disabled={loading} size="lg">
                                {loading ? "Loading..." : "Load More Pokemon"}
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
} 