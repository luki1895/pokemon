import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Pokemon, PokemonApiResponse } from './models/pokemon.models';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private readonly baseImageUrl =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';

  getPokemons(limit = 150): Observable<Pokemon[]> {
    return this.http
      .get<PokemonApiResponse>(`${this.apiUrl}?limit=${limit}`)
      .pipe(
        map(({ results }) =>
          results.map(({ name, url }) => {
            const id = Number(url.split('/').filter(Boolean).pop());

            return {
              id,
              name,
              image: `${this.baseImageUrl}${id}.png`,
            };
          }),
        ),
      );
  }
}