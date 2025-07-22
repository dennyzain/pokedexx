"use client"

import { PokemonCard } from "@/modules/shared/component/PokemonCard"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { ApolloError } from "@apollo/client"

interface FavoritesComponentProps {
    favoritePokemon: number[]
    loading: boolean
    error: ApolloError | undefined
    pokemon: any[]
}

export function FavoritesComponent({
    favoritePokemon,
    loading,
    error,
    pokemon
}: FavoritesComponentProps) {
    if (favoritePokemon.length === 0) {
        return (
            <div className="text-center py-12 space-y-4">
                <h1 className="text-3xl font-bold">No Favorite Pokemon Yet</h1>
                <p className="text-muted-foreground max-w-md mx-auto">
                    You haven't added any Pokemon to your favorites yet. Start exploring and click the heart icon on Pokemon you love!
                </p>
                <Link href="/">
                    <Button className="mt-4">
                        <span className="mr-2">🔍</span>
                        Browse Pokemon
                    </Button>
                </Link>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="space-y-8">
                <h1 className="text-3xl font-bold">Favorite Pokemon</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {Array.from({ length: favoritePokemon.length }).map((_, i) => (
                        <div key={i} className="space-y-4">
                            <Skeleton className="h-48 w-full rounded-lg" />
                            <Skeleton className="h-4 w-3/4 mx-auto" />
                            <Skeleton className="h-4 w-1/2 mx-auto" />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="space-y-8">
                <h1 className="text-3xl font-bold">Favorite Pokemon</h1>
                <div className="text-center text-destructive">
                    <p>Error loading favorites: {error.message}</p>
                    <Button onClick={() => window.location.reload()} className="mt-4">
                        Try Again
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold flex items-center">
                    Favorite Pokemon
                </h1>
                <p className="text-muted-foreground">
                    {favoritePokemon.length} favorite{favoritePokemon.length !== 1 ? "s" : ""}
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {pokemon.map((pokemon: any) => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
            </div>
        </div>
    )
} 