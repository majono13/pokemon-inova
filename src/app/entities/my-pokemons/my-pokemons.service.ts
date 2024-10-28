import { Injectable } from '@angular/core';
import { EntityService } from '../entity/entity.service';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { IPokemonInfo } from 'src/app/models/pokemon-info.model';
import { ICityInfo } from 'src/app/models/city-info.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IUserInfo } from 'src/app/models/user-info';
import { localStorageKeys } from 'src/app/enums/localstorage.enum';
import { IMyPokemon } from 'src/app/models/my-pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class MyPokemonsService extends EntityService<IMyPokemon> {

  readonly collectionName = 'my-pokemons';

  constructor(
    protected override http: HttpClient,
    protected override utilsService: UtilsService,
    protected override firestore: AngularFirestore
    ) {
    super(http, utilsService);
  }

  async savePokemon(pokemonInfo: IPokemonInfo, cityInfo: ICityInfo) {
    const uid = this.firestore.createId();
    const pokemon = {
      uid: uid,
      userId:  this.getUserId(),
      name: pokemonInfo.name,
      image: pokemonInfo.image,
      status: pokemonInfo.status,
      captureDate: new Date(),
      city: cityInfo.name,
      temp: cityInfo.temp,
      type: pokemonInfo.type
    };
    return this.save(pokemon, uid, this.collectionName);
  }

  listPokemons() {
    return this.list(this.getUserId(), this.collectionName);
  }

  private getUserId(): string {
    const user: IUserInfo = JSON.parse(localStorage.getItem(localStorageKeys['user'])!);
    return user?.id;
  }

  async deletePokemon(uid: string) {
    return this.delete(uid, this.collectionName);
  }

}
