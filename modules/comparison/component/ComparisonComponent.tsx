"use client"

import { PokemonCard } from "@/modules/shared/component/PokemonCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { ArrowLeft } from 'lucide-react'

interface ComparisonComponentProps {
    comparisonPokemon: any[]
    onClearComparison: () => void
    allStats: string[]
    getStatValue: (pokemon: any, statName: string) => number
    getMaxStatValue: (statName: string) => number
}

export function ComparisonComponent({
    comparisonPokemon,
    onClearComparison,
    allStats,
    getStatValue,
    getMaxStatValue
}: ComparisonComponentProps) {
    if (comparisonPokemon.length === 0) {
        return (
            <div className="text-center py-12 space-y-4">
                <div className="text-6xl mb-4">⚖️</div>
                <h1 className="text-3xl font-bold">No Pokemon to Compare</h1>
                <p className="text-muted-foreground max-w-md mx-auto">
                    Add Pokemon to comparison by clicking the plus icon on Pokemon cards. You can compare up to 4 Pokemon at once.
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

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold">Pokemon Comparison</h1>
                </div>

                <Button onClick={onClearComparison} variant="outline">
                    Clear All
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {comparisonPokemon.map((pokemon) => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Stats Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {allStats.map((statName) => {
                            const maxValue = getMaxStatValue(statName)
                            return (
                                <div key={statName} className="space-y-3">
                                    <h3 className="font-semibold capitalize text-lg">
                                        {statName.replace('-', ' ')}
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {comparisonPokemon.map((pokemon) => {
                                            const statValue = getStatValue(pokemon, statName)
                                            const isHighest = statValue === maxValue
                                            return (
                                                <div key={pokemon.id} className="space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm font-medium capitalize">
                                                            {pokemon.name}
                                                        </span>
                                                        <span className={`text-sm font-bold ${isHighest ? 'text-green-600 dark:text-green-400' : ''}`}>
                                                            {statValue}
                                                            {isHighest && ' 👑'}
                                                        </span>
                                                    </div>
                                                    <Progress
                                                        value={maxValue > 0 ? (statValue / maxValue) * 100 : 0}
                                                        className={`h-3 ${isHighest ? 'bg-green-100 dark:bg-green-900' : ''}`}
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left p-2">Pokemon</th>
                                    <th className="text-left p-2">Height</th>
                                    <th className="text-left p-2">Weight</th>
                                    <th className="text-left p-2">Base Experience</th>
                                    <th className="text-left p-2">Types</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonPokemon.map((pokemon) => (
                                    <tr key={pokemon.id} className="border-b">
                                        <td className="p-2 font-medium capitalize">{pokemon.name}</td>
                                        <td className="p-2">{pokemon.height / 10}m</td>
                                        <td className="p-2">{pokemon.weight / 10}kg</td>
                                        <td className="p-2">{pokemon.base_experience}</td>
                                        <td className="p-2">
                                            <div className="flex gap-1">
                                                {pokemon.pokemon_v2_pokemontypes.map((typeInfo: any) => (
                                                    <span
                                                        key={typeInfo.pokemon_v2_type.name}
                                                        className={`pokemon-type-${typeInfo.pokemon_v2_type.name} text-white text-xs px-2 py-1 rounded`}
                                                    >
                                                        {typeInfo.pokemon_v2_type.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
} 