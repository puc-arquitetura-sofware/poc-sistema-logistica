import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';
import { Usuario } from 'src/app/pages/models/usuario';
import { CepConsulta, Endereco } from 'src/app/pages/models/endereco';

@Injectable()
export class UsuarioService extends BaseService {

    usuario: Usuario;

    constructor(private http: HttpClient) { super() }

    obterTodos(): Observable<Usuario[]> {
        return this.http
            .get<Usuario[]>(this.UrlServiceV1 + "usuario")
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<Usuario> {
        return this.http
            .get<Usuario>(this.UrlServiceV1 + "usuario/id?id=" + id, super.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novoUsuario(Usuario: Usuario): Observable<Usuario> {
        return this.http
            .post(this.UrlServiceV1 + "usuario", Usuario, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarUsuario(Usuario: Usuario): Observable<Usuario> {
        return this.http
            .put(this.UrlServiceV1 + "usuario/id?id=" + Usuario.id, Usuario, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirUsuario(id: string): Observable<Usuario> {
        return this.http
            .delete(this.UrlServiceV1 + "usuario/id?id=" + id, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarEndereco(endereco: Endereco): Observable<Endereco> {
        return this.http
            .put(this.UrlServiceV1 + "usuario/endereco/id?id=" + endereco.id, endereco, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    consultarCep(cep: string): Observable<CepConsulta> {
        return this.http
            .get<CepConsulta>(`https://viacep.com.br/ws/${cep}/json/`)
            .pipe(catchError(super.serviceError))
    }
}
