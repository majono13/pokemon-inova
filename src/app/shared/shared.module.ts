import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//PRIMENG
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { StatusBarPipe } from './pipes/status-bar.pipe';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
//


@NgModule({
  declarations: [
    NavbarComponent,
    StatusBarPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    RouterModule,
    ConfirmDialogModule
  ],
  exports: [
    NavbarComponent,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    StatusBarPipe,
    CardModule,
    TooltipModule,
    ConfirmDialogModule,
  ]
})
export class SharedModule { }
