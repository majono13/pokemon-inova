import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FindPokemonComponent } from './find-pokemon/find-pokemon.component';
import { MainComponent } from './main/main.component';
import { MyPokemonsComponent } from './my-pokemons/my-pokemons.component';

const routes: Routes = [
  { path: '', component: MainComponent, children: [
    { path: '', component: FindPokemonComponent },
    {path: 'meus-pokemons', component: MyPokemonsComponent}
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
