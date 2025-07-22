"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Plus, Minus } from 'lucide-react'
import { usePokemonStore } from "@/lib/store"
import { Pokemon } from "@/lib/store"
import { useState } from "react"

interface PokemonCardProps {
  pokemon: Pokemon
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const { 
    favoritePokemon, 
    toggleFavorite, 
    comparisonPokemon, 
    addToComparison, 
    removeFromComparison 
  } = usePokemonStore()
  
  const [imageError, setImageError] = useState(false)
  const isFavorite = favoritePokemon.includes(pokemon.id)
  const isInComparison = comparisonPokemon.some(p => p.id === pokemon.id)
  const canAddToComparison = comparisonPokemon.length < 4

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(pokemon.id)
  }

  const handleToggleComparison = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isInComparison) {
      removeFromComparison(pokemon.id)
    } else if (canAddToComparison) {
      addToComparison(pokemon)
    }
  }

  const pokemonImageUrl = imageError 
    ? `/placeholder.svg?height=200&width=200&text=${pokemon.name}`
    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`

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
                onError={() => setImageError(true)}
              />
            </div>
            
            <div className="absolute top-2 right-2 flex gap-1">
              <Button
                size="sm"
                variant={isFavorite ? "default" : "outline"}
                onClick={handleToggleFavorite}
                className="h-8 w-8 p-0"
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
              
              <Button
                size="sm"
                variant={isInComparison ? "default" : "outline"}
                onClick={handleToggleComparison}
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
