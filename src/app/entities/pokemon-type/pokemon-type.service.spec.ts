/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PokemonTypeService } from './pokemon-type.service';

describe('Service: Pokemon', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokemonTypeService]
    });
  });

  it('should ...', inject([PokemonTypeService], (service: PokemonTypeService) => {
    expect(service).toBeTruthy();
  }));
});
