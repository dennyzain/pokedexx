"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Plus, Minus } from 'lucide-react'
import { Pokemon } from "@/lib/store"

interface PokemonCardComponentProps {
    pokemon: Pokemon
    isFavorite: boolean
    isInComparison: boolean
    canAddToComparison: boolean
    pokemonImageUrl: string
    onToggleFavorite: (e: React.MouseEvent) => void
    onToggleComparison: (e: React.MouseEvent) => void
    onImageError: () => void
}

export function PokemonCardComponent({
    pokemon,
    isFavorite,
    isInComparison,
    canAddToComparison,
    pokemonImageUrl,
    onToggleFavorite,
    onToggleComparison,
    onImageError
}: PokemonCardComponentProps) {
    return (
        <Link href={`/pokemon/${pokemon.id}`}>
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <CardContent className="p-4">
                    <div className="relative">
                        <div className="aspect-square relative mb-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg overflow-hidden">
                            <Image
                                src={pokemonImageUrl || "/placeholder.svg"}
                                alt={pokemon.name}
                                fill
                                className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                                onError={onImageError}
                            />
                        </div>

                        <div className="absolute top-2 right-2 flex gap-1">
                            <Button
                                size="sm"
                                variant={isFavorite ? "default" : "outline"}
                                onClick={onToggleFavorite}
                                className="h-8 w-8 p-0"
                            >
                                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                            </Button>

                            <Button
                                size="sm"
                                variant={isInComparison ? "default" : "outline"}
                                onClick={onToggleComparison}
                                disabled={!isInComparison && !canAddToComparison}
                                className="h-8 w-8 p-0"
                            >
                                {isInComparison ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg capitalize">{pokemon.name}</h3>
                            <span className="text-sm text-muted-foreground">#{pokemon.id.toString().padStart(3, '0')}</span>
                        </div>

                        <div className="flex flex-wrap gap-1">
                            {pokemon.pokemon_v2_pokemontypes.map((typeInfo) => (
                                <Badge
                                    key={typeInfo.pokemon_v2_type.name}
                                    className={`pokemon-type-${typeInfo.pokemon_v2_type.name} text-white text-xs`}
                                >
                                    {typeInfo.pokemon_v2_type.name}
                                </Badge>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                            <div>Height: {pokemon.height / 10}m</div>
                            <div>Weight: {pokemon.weight / 10}kg</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
} 