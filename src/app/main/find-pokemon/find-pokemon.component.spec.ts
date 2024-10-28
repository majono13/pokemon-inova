import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindPokemonComponent } from './find-pokemon.component';

describe('FindPokemonComponent', () => {
  let component: FindPokemonComponent;
  let fixture: ComponentFixture<FindPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindPokemonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
