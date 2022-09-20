import { Component, OnInit } from '@angular/core';
import { Observable, filter, tap } from 'rxjs';
import { FormComponent } from '../components/form/form.component';
import { MatDialog } from '@angular/material/dialog';

import { PokedexFirestoreService } from 'src/app/core/pokedex-firestore.service';
import { Pokemon } from '../interfaces/pokemon.interface';
@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  allPokemon$!: Observable<Pokemon[]>;
  selectedPokemon?: Pokemon;

  constructor(
    private readonly pokedexService: PokedexFirestoreService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.allPokemon$ = this.pokedexService.getAll();
  }

  addPokemon() {
    const dialogRef = this.dialog.open(FormComponent, {
      data: {},
      width: '40%',
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((pokemon) => this.pokedexService.create(pokemon))
      )
      .subscribe();
  }

  updatePokemon() {
    const dialogRef = this.dialog.open(FormComponent, {
      data: { ...this.selectedPokemon },
      width: '40%',
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((pokemon) => this.pokedexService.update(pokemon)),
        tap((pokemon) => this.selectPokemon(pokemon))
      )
      .subscribe();
  }

  selectPokemon(pokemon: Pokemon) {
    this.selectedPokemon = pokemon;
  }

  deletePokemon() {
    this.pokedexService.delete(this.selectedPokemon!.id);
    this.selectedPokemon = undefined;
  }
}
