import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, take, takeUntil } from 'rxjs';
import { MyPokemonsService } from 'src/app/entities/my-pokemons/my-pokemons.service';
import { OpenWeatherMapService } from 'src/app/entities/open-weather-map/open-weather-map.service';
import { PokemonTypeService } from 'src/app/entities/pokemon-type/pokemon-type.service';
import { BackgroundEnum } from 'src/app/enums/background.enum';
import { ICityInfo } from 'src/app/models/city-info.model';
import { IOpenWeatherMap } from 'src/app/models/open-weather-map.model';
import { IPokemonInfo } from 'src/app/models/pokemon-info.model';
import { IPokemonTypeSlot } from 'src/app/models/pokemon-type-response.model';
import { IPokemonType } from 'src/app/models/pokemon-type.model';
import { UtilsService } from 'src/app/shared/utils/utils.service';

@Component({
  selector: 'app-find-pokemon',
  templateUrl: './find-pokemon.component.html',
  styleUrls: ['./find-pokemon.component.scss']
})
export class FindPokemonComponent implements OnInit, OnDestroy {

  @ViewChild('backgroundDiv') backgroundDiv!: ElementRef;

  form: FormGroup;
  destroy$ = new Subject<void>();
  loading = false;
  private typesOptions?: IPokemonType;
  private currentPokemon?: IPokemonTypeSlot;
  private type?: string;
  pokemonInfo?: IPokemonInfo;
  cityInfo?: ICityInfo;

  constructor(
    private fb: FormBuilder,
    private utilsService: UtilsService,
    private openWeatherMapService: OpenWeatherMapService,
    private pokemonTypeService: PokemonTypeService,
    private myPokemonsService: MyPokemonsService
    ) { 
      this.form = this.fb.group({
        city: [null, [Validators.minLength(3)]]
      });
    }

  ngOnInit(): void {
    this.getPokemonsTypesOptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getPokemonsTypesOptions() {
    this.pokemonTypeService.get('')
    .pipe(takeUntil(this.destroy$))
    .subscribe(response => this.typesOptions = response);
  }

  onSearch() {
    if (this.form.valid) {
      this.loading = true;
      const form = this.form.getRawValue();
      this.openWeatherMapService.get(`q=${form.city}&units=metric&lang=pt`)
      .pipe(take(1))
      .subscribe({
        next: (response) => this.getPokemon(response),
        error: () => {
          this.loading = false;
          this.utilsService.addMessage('error', 'Falha ao buscar dados climáticos' , 'Não foi possível processar a requisição, verifique a cidade escolhida e tente novamente.');
        }
      });
    } else {
      this.utilsService.addMessage('error', 'Formulário inválido', 'Por favor, digite 3 ou mais caracteres para continuar.');
    }
  }

  private getPokemon(data: IOpenWeatherMap) {
    const type = this.getPokemonType(data);
    this.type = this.getTypeName(type);
    this.setBackground(type);
    if (this.typesOptions) {
      const urlType = this.typesOptions.results.find(pokemonType => pokemonType.name === type)?.url;

      if (urlType) {
        this.pokemonTypeService.getPokemonByUrlType(urlType)
        .pipe(take(1))
        .subscribe({
          next: (res) => { this.getDistinctPokemon(res.pokemon) },
          error: () => {
            this.loading = false;
            this.utilsService.addMessage('error', 'Falha ao buscar pokémon', 'Não foi possível processar a requisição, tente novamente mais tarde.');
          }
        });
      }
    }
  }

  private setBackground(type: string) {
    const background = BackgroundEnum[type as keyof typeof BackgroundEnum];
    if (this.backgroundDiv && background) {
      this.backgroundDiv.nativeElement.style.backgroundImage = `url(${background})`;
    }
  }

  private getDistinctPokemon(pokemons: IPokemonTypeSlot[]) {
    let pokemonIndex: number;
    do {
      pokemonIndex = this.utilsService.getRandomIndex(0, pokemons.length);
    } while (pokemons[pokemonIndex] === this.currentPokemon);

    this.currentPokemon = pokemons[pokemonIndex];
    this.pokemonTypeService.getPokemonByUrl(this.currentPokemon.pokemon.url)
    .subscribe(res => {
      res.type = this.type || '';
      this.pokemonInfo = res; 
    });
    this.loading = false;
  }

  private getPokemonType(data: IOpenWeatherMap): string {
    const raining = data.weather[0]?.main === 'Rain';

    this.getCityInfo(data, raining);

    if (raining) return 'electric';
    
    const temp =  data.main.temp;
    if (temp < 5) return 'ice';
    if (temp >= 5 && temp < 10) return 'water';
    if (temp >= 12 && temp < 15) return 'grass';
    if (temp >= 15 && temp < 21) return 'ground';
    if (temp >= 23 && temp < 27) return 'bug';
    if (temp >= 27 && temp < 33) return 'rock';
    if (temp > 33) return 'fire';
    return 'normal';
  }

  private getTypeName(type: string) {
    switch(type) {
      case 'electric': return 'Elétrico';
      case 'ice': return 'Gelo';
      case 'water': return 'Água';
      case 'grass': return 'Grama';
      case 'ground': return 'Terra';
      case 'bug': return 'Inseto';
      case 'rock': return 'Pedra';
      case 'fire': return 'Fogo';
      default: return 'Normal';
    }
  }

  private getCityInfo(data: IOpenWeatherMap, raining: boolean) {
    this.cityInfo = {
      raining: raining,
      temp: data.main.temp,
      name: data.name,
      description: data.weather[0].description
    };
  }

  clear() {
    this.currentPokemon = undefined;
    this.pokemonInfo = undefined;
    this.cityInfo = undefined;
    this.type = undefined;
    this.form.get('city')?.patchValue(null);
    this.backgroundDiv.nativeElement.style.backgroundImage = '';
  }

  async OnCapture() {
    await this.myPokemonsService.savePokemon(this.pokemonInfo!, this.cityInfo!)
    .then(() => {
      this.utilsService.addMessage('success', 'Pokemon capturado!', '')
      this.clear();
    })
    .catch((err) => this.utilsService.addMessage('error', 'Falha ao salvar', 'Ocorreu um erro ao tentar salvar os dados. Por favor, tente novamente.'));
  }

}
