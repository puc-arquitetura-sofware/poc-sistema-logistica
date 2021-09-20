import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Perfil } from 'src/app/models/Perfil';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilService  extends BaseService {

  constructor(private http: HttpClient) { super(); }


  
  buscarPerfis(): Observable<Array<Perfil>> {
    let response = this.http
        .get(this.UrlServiceV1 + 'perfil')
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));

    return response;
  }
}
