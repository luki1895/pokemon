import { Component, OnInit, inject, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { PokemonService } from '../pokemon-service';
import { Pokemon } from '../models/pokemon.models';

@Component({
  selector: 'app-pokemon-lista',
  imports: [TitleCasePipe],
  styleUrl: './pokemon-lista.css',
  templateUrl: './pokemon-lista.html',
})
export class PokemonLista implements OnInit {
  private readonly pokemonService = inject(PokemonService);
  pokemons = signal<Pokemon[]>([]);
  cargando = signal(true);
  error = signal(false);

  ngOnInit(): void {
    this.cargando.set(true);
    this.error.set(false);

    this.pokemonService.getPokemons(150).subscribe({
      next: (lista) => {
        this.pokemons.set(lista);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set(true);
        this.cargando.set(false);
      },
    });
  }
}