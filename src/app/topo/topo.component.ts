import { Component, OnInit } from '@angular/core';
import {  Observable, Subject, of} from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from  'rxjs/operators'

import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css']
})
export class TopoComponent implements OnInit {

constructor(private ofertasService: OfertasService) { }

  public ofertas : Observable<Oferta[]>;
  private subjectPesquisa: Subject<string> = new Subject<string>();


  ngOnInit(): void {
    this.ofertas = this.subjectPesquisa
    .pipe(
        debounceTime(1000), //executa a cao do switcmap após 1 segundo
        distinctUntilChanged(), //para fazer pesquisas distintas
        switchMap((termo: string)=> {
          if(termo.trim() === '') {
            return of<Oferta[]>([]);
          }
          return this.ofertasService.pesquisaPorOfertas(termo);
        }),

        catchError((err:any) => {
          console.log(err)
           return of<Oferta[]>([])
        })
      )

  }

  public pesquisa(termoDaBusca: string) : void {
    console.log('Keyup caracter: ', termoDaBusca)
    this.subjectPesquisa.next(termoDaBusca);
  }

  public limpaPesquisa(): void {
    this.subjectPesquisa.next('');
  }

}
