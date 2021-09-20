import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';
import { Usuario } from 'src/app/pages/models/usuario';
import { CepConsulta, Endereco } from 'src/app/pages/models/endereco';
import { MercadoriaCliente } from 'src/app/pages/models/mercadoriaCliente';
import { Entrega } from 'src/app/pages/models/entrega';

@Injectable()
export class LogisticaService extends BaseService {

    usuario: Usuario;

    constructor(private http: HttpClient) { super() }

    obterTodos(): Observable<Entrega[]> {
        return this.http
            .get<Entrega[]>(this.UrlServiceV1 + "entrega")
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<Entrega> {
        return this.http
            .get<Entrega>(this.UrlServiceV1 + "entrega/id?id=" + id)
            .pipe(catchError(super.serviceError));
    }


    consultarCep(cep: string): Observable<CepConsulta> {
        return this.http
            .get<CepConsulta>(`https://viacep.com.br/ws/${cep}/json/`)
            .pipe(catchError(super.serviceError))
    }
}
