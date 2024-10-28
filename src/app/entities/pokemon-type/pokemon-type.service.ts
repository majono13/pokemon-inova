import { Injectable } from '@angular/core';
import { EntityService } from '../entity/entity.service';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IPokemonType } from 'src/app/models/pokemon-type.model';
import { IPokemonTypeResponse } from 'src/app/models/pokemon-type-response.model';
import { map } from 'rxjs';
import { IPokemon } from 'src/app/models/pokemon.model';

@Injectable({
  providedIn: 'root'
})

export class PokemonTypeService extends EntityService<IPokemonType> {
  protected override entityUrl: string;

  constructor(
    protected override http: HttpClient,
    protected override utilsService: UtilsService,
    ) {
    super(http, utilsService);
    this.entityUrl = environment.pokemonUrl;
  }

  getPokemonByUrlType(url: string) {
    return this.http.get<IPokemonTypeResponse>(url);
  }

  getPokemonByUrl(url: string) {
    return this.http.get<IPokemon>(url)
    .pipe(map(res => {
      return {
        image: res?.sprites?.front_default,
        name: res?.name,
        type: '',
        status: res.stats.map(s => {
          return {
            value: s.base_stat,
            name: this.getStatusName(s.stat.name)
          }
        })
      }
    }));
  }

  private getStatusName(status: string) {
    switch(status) {
      case 'hp': return 'HP';
      case 'attack': return 'Ataque';
      case 'defense': return 'Defesa';
      case 'special-attack': return 'Ataque especial';
      case 'special-defense': return 'Defesa especial';
      case 'speed': return 'Velocidade';
      default: return 'Desconhecido';
    }
  }
}
