import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from 'src/app/ofertas.service';

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css']
})
export class OndeFicaComponent implements OnInit {

  ondeFica: string;
  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
    ) { }

  ngOnInit(): void {
    this.route.parent.params.subscribe((parametros: Params)=> {
      this.ofertasService.getOndeFicaOfertaProId(parametros.id)
      .then((descricao:string)=>{
        this.ondeFica = descricao;
      })
    })
  }

}
