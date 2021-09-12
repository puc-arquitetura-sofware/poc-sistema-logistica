import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ContaRoutingModule } from './conta-routing.module';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ContaAppComponent } from './conta.app.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContaService } from './services/conta.service';
import { ContaGuard } from './services/conta.guard';
import { CustomFormsModule } from 'ngx-custom-validators';

import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';


@NgModule({
  declarations: [
    ContaAppComponent,
    LoginComponent, 
    CadastroComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CustomFormsModule,
    ContaRoutingModule,
    NgBrazil,
    TextMaskModule,
  ],
  providers: [
    ContaService,
    ContaGuard
  ]

})
export class ContaModule { }
