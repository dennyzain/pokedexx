"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, X, Search, Filter } from "lucide-react"

interface PokemonFiltersComponentProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    searchQuery: string
    onSearchQueryChange: (query: string) => void
    selectedTypes: string[]
    onTypeToggle: (typeName: string) => void
    selectedGeneration: string
    onGenerationChange: (generation: string) => void
    sortBy: string
    sortOrder: string
    onSortChange: (value: string) => void
    hasActiveFilters: boolean
    onClearAllFilters: () => void
    typesData: any
    generationsData: any
}

export function PokemonFiltersComponent({
    isOpen,
    onOpenChange,
    searchQuery,
    onSearchQueryChange,
    selectedTypes,
    onTypeToggle,
    selectedGeneration,
    onGenerationChange,
    sortBy,
    sortOrder,
    onSortChange,
    hasActiveFilters,
    onClearAllFilters,
    typesData,
    generationsData
}: PokemonFiltersComponentProps) {
    return (
        <div className="space-y-6 bg-card/30 backdrop-blur-sm rounded-3xl p-6 border border-border/50">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                    <Input
                        placeholder="Search your favorite Pokemon..."
                        value={searchQuery}
                        onChange={(e) => onSearchQueryChange(e.target.value)}
                        className="pl-12 h-12 rounded-2xl border-2 border-border/50 focus:border-primary/50 bg-background/50"
                    />
                </div>

                <div className="flex gap-3">
                    <Select
                        value={`${sortBy}-${sortOrder}`}
                        onValueChange={onSortChange}
                    >
                        <SelectTrigger className="w-48 h-12 rounded-2xl border-2 border-border/50 bg-background/50">
                            <SelectValue placeholder="Sort by..." />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl">
                            <SelectItem value="id-asc">ID (Low to High)</SelectItem>
                            <SelectItem value="id-desc">ID (High to Low)</SelectItem>
                            <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                            <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                            <SelectItem value="height-asc">Height (Low to High)</SelectItem>
                            <SelectItem value="height-desc">Height (High to Low)</SelectItem>
                            <SelectItem value="weight-asc">Weight (Low to High)</SelectItem>
                            <SelectItem value="weight-desc">Weight (High to Low)</SelectItem>
                        </SelectContent>
                    </Select>

                    {hasActiveFilters && (
                        <Button
                            variant="outline"
                            onClick={onClearAllFilters}
                            className="h-12 rounded-2xl border-2 hover:bg-destructive/10 bg-transparent"
                        >
                            <X className="h-4 w-4 mr-2" />
                            Clear
                        </Button>
                    )}
                </div>
            </div>

            <Collapsible open={isOpen} onOpenChange={onOpenChange}>
                <CollapsibleTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-full justify-between h-12 rounded-2xl border-2 border-border/50 hover:bg-accent/50 bg-transparent"
                    >
                        <div className="flex items-center">
                            <Filter className="h-4 w-4 mr-2" />
                            Advanced Filters
                        </div>
                        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </Button>
                </CollapsibleTrigger>

                <CollapsibleContent className="space-y-6 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <Label className="text-base font-semibold flex items-center">
                                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                                Pokemon Types
                            </Label>
                            <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto p-4 bg-accent/20 rounded-2xl">
                                {typesData?.pokemon_v2_type.map((type: any) => (
                                    <div key={type.id} className="flex items-center space-x-3">
                                        <Checkbox
                                            id={type.name}
                                            checked={selectedTypes.includes(type.name)}
                                            onCheckedChange={() => onTypeToggle(type.name)}
                                            className="rounded-md"
                                        />
                                        <Label htmlFor={type.name} className="text-sm capitalize cursor-pointer font-medium">
                                            {type.name}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label className="text-base font-semibold flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                Generation
                            </Label>
                            <Select value={selectedGeneration} onValueChange={onGenerationChange}>
                                <SelectTrigger className="h-12 rounded-2xl border-2 border-border/50 bg-background/50">
                                    <SelectValue placeholder="Select generation..." />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl">
                                    <SelectItem value="all">All Generations</SelectItem>
                                    {generationsData?.pokemon_v2_generation.map((gen: any) => (
                                        <SelectItem key={gen.id} value={gen.name}>
                                            {gen.name.replace("generation-", "Generation ").toUpperCase()}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    )
} 