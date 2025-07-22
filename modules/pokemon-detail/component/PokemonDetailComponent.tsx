"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Heart, Plus, Minus } from 'lucide-react'
import { ApolloError } from "@apollo/client"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { ArrowLeft } from 'lucide-react'

interface PokemonDetailComponentProps {
    pokemon: any
    loading: boolean
    error: ApolloError | undefined
    isFavorite: boolean
    isInComparison: boolean
    canAddToComparison: boolean
    pokemonImageUrl: string
    maxStat: number
    onToggleFavorite: () => void
    onToggleComparison: () => void
    onImageError: () => void
}

export function PokemonDetailComponent({
    pokemon,
    loading,
    error,
    isFavorite,
    isInComparison,
    canAddToComparison,
    pokemonImageUrl,
    maxStat,
    onToggleFavorite,
    onToggleComparison,
    onImageError
}: PokemonDetailComponentProps) {
    if (loading) {
        return (
            <div className="space-y-8">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-8 w-48" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Skeleton className="h-96 w-full" />
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-32 w-full" />
                    </div>
                </div>
            </div>
        )
    }

    if (error || !pokemon) {
        return (
            <div className="text-center py-12">
                <div className="text-6xl mb-4">😢</div>
                <h2 className="text-2xl font-bold mb-2">Pokemon Not Found</h2>
                <p className="text-muted-foreground mb-4">
                    {error ? `Error: ${error.message}` : "This Pokemon doesn't exist in our database."}
                </p>
                <Link href="/">
                    <Button>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
                <CardContent className="p-6">
                    <div className="relative aspect-square mb-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg overflow-hidden">
                        <Image
                            src={pokemonImageUrl || "/placeholder.svg"}
                            alt={pokemon.name}
                            fill
                            className="object-contain p-4"
                            onError={onImageError}
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold capitalize">{pokemon.name}</h2>
                            <span className="text-lg text-muted-foreground">
                                #{pokemon.id.toString().padStart(3, '0')}
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {pokemon.pokemon_v2_pokemontypes.map((typeInfo: any) => (
                                <Badge
                                    key={typeInfo.pokemon_v2_type.name}
                                    className={`pokemon-type-${typeInfo.pokemon_v2_type.name} text-white`}
                                >
                                    {typeInfo.pokemon_v2_type.name}
                                </Badge>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-muted-foreground">Height:</span>
                                <div className="font-semibold">{pokemon.height / 10}m</div>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Weight:</span>
                                <div className="font-semibold">{pokemon.weight / 10}kg</div>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Base Experience:</span>
                                <div className="font-semibold">{pokemon.base_experience}</div>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Generation:</span>
                                <div className="font-semibold capitalize">
                                    {pokemon.pokemon_v2_pokemonspecy?.pokemon_v2_generation?.name?.replace('generation-', 'Gen ') || 'Unknown'}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                onClick={onToggleFavorite}
                                variant={isFavorite ? "default" : "outline"}
                                className="flex-1"
                            >
                                <Heart className={`mr-2 h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                            </Button>

                            <Button
                                onClick={onToggleComparison}
                                variant={isInComparison ? "default" : "outline"}
                                disabled={!isInComparison && !canAddToComparison}
                                className="flex-1"
                            >
                                {isInComparison ? <Minus className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                                {isInComparison ? 'Remove from Comparison' : 'Add to Comparison'}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Base Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {pokemon.pokemon_v2_pokemonstats.map((stat: any) => (
                            <div key={stat.pokemon_v2_stat.name} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="capitalize font-medium">
                                        {stat.pokemon_v2_stat.name.replace('-', ' ')}
                                    </span>
                                    <span className="font-bold">{stat.base_stat}</span>
                                </div>
                                <Progress
                                    value={(stat.base_stat / maxStat) * 100}
                                    className="h-2"
                                />
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {pokemon.pokemon_v2_pokemonabilities?.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Abilities</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {pokemon.pokemon_v2_pokemonabilities.map((abilityInfo: any, index: number) => (
                                    <Badge key={index} variant="outline" className="capitalize">
                                        {abilityInfo.pokemon_v2_ability.name.replace('-', ' ')}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {pokemon.pokemon_v2_pokemonmoves?.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Sample Moves</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-3">
                                {pokemon.pokemon_v2_pokemonmoves.slice(0, 6).map((moveInfo: any, index: number) => (
                                    <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                                        <div>
                                            <div className="font-medium capitalize">
                                                {moveInfo.pokemon_v2_move.name.replace('-', ' ')}
                                            </div>
                                            <Badge
                                                className={`pokemon-type-${moveInfo.pokemon_v2_move.pokemon_v2_type.name} text-white text-xs mt-1`}
                                            >
                                                {moveInfo.pokemon_v2_move.pokemon_v2_type.name}
                                            </Badge>
                                        </div>
                                        <div className="text-right text-sm text-muted-foreground">
                                            {moveInfo.pokemon_v2_move.power && (
                                                <div>Power: {moveInfo.pokemon_v2_move.power}</div>
                                            )}
                                            {moveInfo.pokemon_v2_move.accuracy && (
                                                <div>Accuracy: {moveInfo.pokemon_v2_move.accuracy}%</div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
} 