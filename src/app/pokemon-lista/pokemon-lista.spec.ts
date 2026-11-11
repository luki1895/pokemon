import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PokemonService } from '../pokemon-service';
import { PokemonLista } from './pokemon-lista';

describe('PokemonLista', () => {
  let component: PokemonLista;
  let fixture: ComponentFixture<PokemonLista>;
  let pokemonService: { getPokemons: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    pokemonService = { getPokemons: vi.fn().mockReturnValue(of([])) };

    await TestBed.configureTestingModule({
      imports: [PokemonLista],
      providers: [{ provide: PokemonService, useValue: pokemonService }],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonLista);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should request exactly 150 Pokémon', () => {
    expect(pokemonService.getPokemons).toHaveBeenCalledOnce();
    expect(pokemonService.getPokemons).toHaveBeenCalledWith(150);
  });
});
