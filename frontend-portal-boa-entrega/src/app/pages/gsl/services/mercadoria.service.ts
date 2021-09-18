import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';
import { Mercadoria, Fornecedor } from '../../models/mercadoria';

@Injectable()
export class MercadoriaService extends BaseService {

    constructor(private http: HttpClient) { super() }

    obterTodos(): Observable<Mercadoria[]> {
        return this.http
            .get<Mercadoria[]>(this.UrlServiceV1 + "mercadoria", super.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<Mercadoria> {
        return this.http
            .get<Mercadoria>(this.UrlServiceV1 + "mercadoria/id?id=" + id, super.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorDeposito(depositoId: string): Observable<Mercadoria[]> {
        return this.http
            .get<Mercadoria[]>(this.UrlServiceV1 + "mercadoria/obter-por-deposito?depositoId=" + depositoId, super.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }


    obterPorCliente(clienteId: string): Observable<Mercadoria[]> {
        return this.http
            .get<Mercadoria[]>(this.UrlServiceV1 + "mercadoria/obter-por-cliente?clienteId=" + clienteId, super.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novoMercadoria(mercadoria: Mercadoria): Observable<Mercadoria> {
        return this.http
            .post(this.UrlServiceV1 + "mercadoria", mercadoria, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarMercadoria(mercadoria: Mercadoria): Observable<Mercadoria> {
        return this.http
            .put(this.UrlServiceV1 + "mercadoria/id?id=" + mercadoria.id, mercadoria, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirMercadoria(id: string): Observable<Mercadoria> {
        return this.http
            .delete(this.UrlServiceV1 + "mercadoria/id?id=" + id, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }    

    obterFornecedores(): Observable<Fornecedor[]> {
        return this.http
            .get<Fornecedor[]>(this.UrlServiceV1 + "fornecedores")
            .pipe(catchError(super.serviceError));
    }
}
