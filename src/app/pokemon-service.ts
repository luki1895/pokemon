import { Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon, RespuestaPokemon } from './pokemon';

@Injectable({
    providedIn: 'root'
})
export class PokemonService {
    private http = 'https://pokeapi.co/api/v2/pokemon';

    private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

    private baseImgUrl = 
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';
    getPokemons(limit=151): Observable<Pokemon[]> {
        
        return this.http.get<RespuestaPokemon>(`${this.apiUrl}?limit=${limit}`).pipe(
            map((resp) => {
                return resp.results.map(item => {
                    const id = Number(item.url.split('/').filter(Boolean).pop());
                    return {
                        id,
                        name: item.name,
                        imagen: `${this.baseImgUrl}${id}.png`
                    };
                });
            })
        );
    }