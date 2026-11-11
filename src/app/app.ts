import { Component } from '@angular/core';
import { PokemonLista } from './pokemon-lista/pokemon-lista';

@Component({
  imports: [PokemonLista],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
