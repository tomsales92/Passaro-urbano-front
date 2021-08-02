import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Pedido } from './shared/pedido.model';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class OrdemCompraService {

  constructor(private http: HttpClient){}

    public efetivarCompra(pedido: Pedido): Observable<number> {
      let headers: HttpHeaders = new HttpHeaders();
      headers.append('Content-type', 'application/json');
      return this.http.post<any>(
          `${API}/pedidos`,
           (pedido),
           ({headers: headers})
      )
      .pipe(map((resposta: Response) => resposta['id']));
  }

}
