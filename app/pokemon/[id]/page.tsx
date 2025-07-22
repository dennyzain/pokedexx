import { PokemonDetail } from "@/modules/pokemon-detail/component"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from 'lucide-react'

interface PokemonPageProps {
  params: {
    id: string
  }
}

export default function PokemonPage({ params }: PokemonPageProps) {
  const pokemonId = parseInt(params.id)

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Pokemon Details</h1>
      </div>

      <PokemonDetail pokemonId={pokemonId} />
    </div>
  )
}
