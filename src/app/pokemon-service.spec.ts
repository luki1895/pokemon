import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { Pokemon } from './models/pokemon.models';
import { PokemonService } from './pokemon-service';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PokemonService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should request 150 Pokémon and map their images', () => {
    let pokemon: Pokemon[] | undefined;

    service.getPokemons().subscribe((result) => {
      pokemon = result;
    });

    const request = httpTesting.expectOne(
      'https://pokeapi.co/api/v2/pokemon?limit=150',
    );
    request.flush({
      count: 150,
      next: null,
      previous: null,
      results: [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }],
    });

    expect(pokemon).toEqual([
      {
        id: 1,
        name: 'bulbasaur',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
      },
    ]);
  });
});
