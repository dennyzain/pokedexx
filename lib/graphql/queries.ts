import { gql } from "@apollo/client"

export const GET_POKEMON_LIST = gql`
  query GetPokemonList($limit: Int!, $offset: Int!, $where: pokemon_v2_pokemon_bool_exp) {
    pokemon_v2_pokemon(
      limit: $limit
      offset: $offset
      where: $where
      order_by: { id: asc }
    ) {
      id
      name
      height
      weight
      base_experience
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
      pokemon_v2_pokemonspecy {
        pokemon_v2_generation {
          name
        }
      }
    }
  }
`

export const GET_POKEMON_DETAIL = gql`
  query GetPokemonDetail($id: Int!) {
    pokemon_v2_pokemon_by_pk(id: $id) {
      id
      name
      height
      weight
      base_experience
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
      pokemon_v2_pokemonspecy {
        pokemon_v2_generation {
          name
        }
        pokemon_v2_evolutionchain {
          pokemon_v2_pokemonspecies {
            id
            name
            pokemon_v2_pokemons {
              id
              name
            }
          }
        }
      }
      pokemon_v2_pokemonmoves(limit: 10) {
        pokemon_v2_move {
          name
          power
          accuracy
          pokemon_v2_type {
            name
          }
        }
      }
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
    }
  }
`

export const GET_POKEMON_TYPES = gql`
  query GetPokemonTypes {
    pokemon_v2_type {
      id
      name
    }
  }
`

export const GET_GENERATIONS = gql`
  query GetGenerations {
    pokemon_v2_generation {
      id
      name
    }
  }
`
