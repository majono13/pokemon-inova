/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MyPokemonsService } from './my-pokemons.service';

describe('Service: MyPokemons', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyPokemonsService]
    });
  });

  it('should ...', inject([MyPokemonsService], (service: MyPokemonsService) => {
    expect(service).toBeTruthy();
  }));
});
