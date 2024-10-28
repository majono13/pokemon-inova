import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { MyPokemonsService } from 'src/app/entities/my-pokemons/my-pokemons.service';
import { IMyPokemon } from 'src/app/models/my-pokemon.model';
import { UtilsService } from 'src/app/shared/utils/utils.service';

@Component({
  selector: 'app-my-pokemons',
  templateUrl: './my-pokemons.component.html',
  styleUrls: ['./my-pokemons.component.scss']
})
export class MyPokemonsComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<void>();
  data: IMyPokemon[] = [];

  constructor(
    private myPokemonsService: MyPokemonsService,
    private utilsService: UtilsService,
    private confirmationService: ConfirmationService
    ) { }

  ngOnInit(): void {
    this.list();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private list() {
    this.myPokemonsService.listPokemons()
    .pipe(takeUntil(this.destroy$))
    .subscribe(values => {
      this.data = values;
    });
  }

  async delete(uid: string) {
    this.confirmationService.confirm({
      header: 'Excluir',
      message: 'Deseja excluir esse pokémon da lista de pokémons salvos?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.myPokemonsService.deletePokemon(uid)
        .then(() => this.utilsService.addMessage('success', 'Pokemon excluído com sucesso!', ''))
        .catch(() => this.utilsService.addMessage('error', 'Falha ao excluir pokemon', 'Por favor, tente novamente mais tarde'));
      },
      reject: () => {}
    })
  }

}
