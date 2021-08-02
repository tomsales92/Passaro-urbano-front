import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';


import { environment } from 'src/environments/environment';
import { Oferta } from './shared/oferta.model';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class OfertasService {
constructor(private http: HttpClient){}

    public getOfertas(): Observable<Oferta[]> {
      return this.http.get<Oferta[]>(`${API}/ofertas?destaque=true`)
    }

    public getOfertasPorCategoria(categoria: string): Observable<Oferta[]> {
      return this.http.get<Oferta[]>(`${API}/ofertas?categoria=${categoria}`)
    }

    public getOfertaPorId(id: number): Promise<Oferta> {
      return this.http.get(`${API}/ofertas?id=${id}`)
      .toPromise()
      .then((resposta: Response) => {
        return resposta[0]
      })
    }

    public getComoUsarOfertaProId(id: number): Promise<string> {
      return this.http.get(`${API}/como-usar?id=${id}`)
      .toPromise()
      .then((resposta: Response) => {
        return resposta[0].descricao
      })
    }

    public getOndeFicaOfertaProId(id: number): Promise<string> {
      return this.http.get(`${API}/onde-fica?id=${id}`)
      .toPromise()
      .then((resposta: Response) => {
        return resposta[0].descricao
      })
    }

    public pesquisaPorOfertas(termo: string) : Observable<Oferta[]> {
      return this.http.get<Oferta[]>(`${API}/ofertas?descricao_oferta_like=${termo}`)
      .pipe(retry(10));
    }
}
