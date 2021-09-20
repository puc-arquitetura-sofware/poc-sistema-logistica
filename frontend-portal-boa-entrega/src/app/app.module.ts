import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/navegacao/home/home.component';
import { AcessoNegadoComponent } from './pages/navegacao/acesso-negado/acesso-negado.component';
import { NotFoundComponent } from './pages/navegacao/not-found/not-found.component';
import { NavegacaoModule } from './pages/navegacao/navegacao.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './services/error.handler.service';
import { SafModule } from './pages/saf/saf.module';
import { PerfilService } from './services/perfil/perfil.service';
import { ListaMercadoriaComponent } from './shared/components/lista-mercadoria/lista-mercadoria.component';
import { SharedModule } from './shared/shared.module';
import '@angular/compiler';
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavegacaoModule,
    SharedModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    httpInterceptorProviders,
    PerfilService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
