import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

constructor(private messageService: MessageService) { }

  addMessage(severity: string, summary: string, message: string, life = 3000) {
    this.messageService.add({ severity: severity, summary: summary, detail: message, life:  life});
  }

  getRandomIndex(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
