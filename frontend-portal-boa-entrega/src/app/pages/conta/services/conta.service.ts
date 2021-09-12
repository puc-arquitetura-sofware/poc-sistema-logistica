import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from 'src/app/services/base.service';
import { PerfilService } from 'src/app/services/perfil/perfil.service';
import { CepConsulta } from '../models/endereco';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ContaService extends BaseService {

  // Create observer object
 myObserver = {
  next: (x: number) => console.log('Observer got a next value: ' + x),
  error: (err: Error) => console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification'),
};

  constructor(
    private http: HttpClient
    ) { super(); }

  registrarUsuario(usuario: Usuario): Observable<any> {
    let response = this.http
          .post(this.UrlServiceV1 + 'usuario/nova-conta', usuario, this.ObterHeaderJson())
          .pipe(
              map(this.extractData),
              catchError(this.serviceError));
   
      return response;

     
  }

  login(usuario: Usuario): Observable<any> {
      let response = this.http
          .post(this.UrlServiceV1 + 'usuario/entrar', usuario, this.ObterHeaderJson())
          .pipe(
              map(this.extractData),
              catchError(this.serviceError));
      // var myObservable  = of({
      //   userToken: usuario,
      //   accessToken: "algumTokenAleatórioPorAqui"
      // });

      // return myObservable

      return response;
  }

  consultarCep(cep: string): Observable<CepConsulta> {
    return this.http
        .get<CepConsulta>(`https://viacep.com.br/ws/${cep}/json/`)
        .pipe(catchError(super.serviceError))
  }
}
