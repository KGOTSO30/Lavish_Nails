import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonComponent } from './pokemon.component';
import { MatDialogModule } from '@angular/material/dialog';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormComponent } from '../components/form/form.component';

import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from '../components/list/list.component';
import { DetailComponent } from '../components/detail/detail.component';


@NgModule({
  declarations: [
    PokemonComponent,
    FormComponent, ListComponent, DetailComponent
  ],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule
  ]
})
export class PokemonModule { }
