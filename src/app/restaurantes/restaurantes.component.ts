import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css']
})
export class RestaurantesComponent implements OnInit {
 public ofertas: Oferta[];
  constructor(private ofertaService: OfertasService) { }

  ngOnInit(): void {
    this.ofertaService.getOfertasPorCategoria('restaurante')
    .subscribe((ofertas: Oferta[])=>{
      this.ofertas = ofertas;
    })
  }

}
