import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from 'src/app/ofertas.service';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css']
})
export class ComoUsarComponent implements OnInit {
  comoUsar: string;
  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
    ) { }

  ngOnInit(): void {
  this.route.parent.params.subscribe((parametros: Params)=>{
    this.ofertasService.getComoUsarOfertaProId(parametros.id)
    .then((descricao:string)=>{
      this.comoUsar = descricao;
    })
  })
  }

}
