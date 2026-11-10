import { Component, OnInit, inject, signal } from '@angular/core';
import { PokemonService } from '../pokemon-service';
import { Pokemon } from '../pokemon';
import{ TitleCasePipe } from '@angular/common';

@Component({
  imports: [TitleCasePipe],
  selector: 'app-pokemon-lista',
  styleUrl: './pokemon-lista.css',
  templateUrl: './pokemon-lista.html',
  standalone: true,

})
export class PokemonLista implements OnInit {
  private pokemonService = inject(PokemonService);
  pokemons = signal<Pokemon[]>([]);
  cargando = signal(true);
  error = signal(false);

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe({
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