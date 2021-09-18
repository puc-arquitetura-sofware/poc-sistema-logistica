import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { MercadoriaDeposito } from 'src/app/pages/models/mercadoriaDeposito';

import { BaseService } from 'src/app/services/base.service';
import { Deposito } from '../models/Deposito';
import { CepConsulta, EnderecoDeposito } from '../models/enderecoDeposito';


@Injectable()
export class DepositoService extends BaseService {

    constructor(private http: HttpClient) 
        { super(); }

    obterTodos(): Observable<Deposito[]> {
        return this.http
            .get<Deposito[]>(this.UrlServiceV1 + "deposito")
            .pipe(catchError(super.serviceError));
    }


    obterPorId(id: string): Observable<Deposito> {
        return this.http
            .get<Deposito>(this.UrlServiceV1 + "deposito/id?id=" + id, super.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    registrarDeposito(deposito: Deposito): Observable<any> {
        return this.http
            .post(this.UrlServiceV1 + "deposito/novo-deposito", deposito, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    vincularMercadoria(mercadoriaDeposito: MercadoriaDeposito): Observable<any> {
        return this.http
            .post(this.UrlServiceV1 + "deposito/vincular-mercadoria?mercadoriaId=" + mercadoriaDeposito.mercadoriaId + "&depositoId=" + mercadoriaDeposito.depositoId + "&quantidade=" + mercadoriaDeposito.quantidade, super.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    atualizarDeposito(deposito: Deposito): Observable<Deposito> {
        return this.http
            .put(this.UrlServiceV1 + "deposito/id?id=" + deposito.id, deposito, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirDeposito(id: string): Observable<Deposito> {
        return this.http
            .delete(this.UrlServiceV1 + "deposito/id?id=" + id, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarEndereco(endereco: EnderecoDeposito): Observable<EnderecoDeposito> {
        return this.http
            .put(this.UrlServiceV1 + "deposito/endereco/id?id=" + endereco.id, endereco, super.ObterAuthHeaderJson())
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
