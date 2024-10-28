import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FindPokemonComponent } from './find-pokemon/find-pokemon.component';
import { MainComponent } from './main/main.component';
import { MyPokemonsComponent } from './my-pokemons/my-pokemons.component';


@NgModule({
  declarations: [
    FindPokemonComponent,
    MainComponent,
    MyPokemonsComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ]
})
export class MainModule { }
