export interface PokemonApiItem {
  id: number;
  name: string;
  url: string;
}

export interface PokemonApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonApiItem[];
}

export interface Pokemon {
  id: number;
  name: string;
  image: string;
}