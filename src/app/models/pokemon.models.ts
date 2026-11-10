export interface Itemapi {
  id: number;
  Url: string;
}
export interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string;
  results: Itemapi[];
}
export interface PokemonDetail {
  id: number;
  name: string;
  img: string;
}