import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AcessoNegadoComponent } from './acesso-negado/acesso-negado.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { MenuLoginComponent } from './menu-login/menu-login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

var components = [
    HomeComponent,
    NotFoundComponent,
    AcessoNegadoComponent,
    MenuComponent,
    MenuLoginComponent,
    FooterComponent
]

@NgModule({
  declarations: [
    HomeComponent,
    NotFoundComponent,
    AcessoNegadoComponent,
    MenuComponent,
    MenuLoginComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  exports: [
    HomeComponent,
    NotFoundComponent,
    AcessoNegadoComponent,
    MenuComponent,
    MenuLoginComponent,
    FooterComponent
  ]
})
export class NavegacaoModule { }
