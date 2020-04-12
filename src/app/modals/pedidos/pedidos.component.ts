import { Component, OnInit, Input, ElementRef, Renderer2, ViewChild} from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { PedidosComponent } from 'src/app/pedidos/pedidos.component';
import { empty } from 'rxjs';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'modal-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosModalsComponent implements OnInit {
  @ViewChild('modal') public modal: ElementRef;
  @ViewChild('modalEliminar') public modalEliminar: ElementRef;
  pedidito: string;
  cantidad: number;
  id: string;
  tipo: string;
  cerebros: any;
  fecha: Date;
  fechaEntrega: Date;
  username: string;

  constructor(private dataService: DataService, private _renderer: Renderer2, private router: Router) { }

  ngOnInit(): void {
    this.dataService.cerebrosObservable
    .subscribe((resultados) => {
      this.cerebros = resultados;
    });
  }

  guardarPedido() {
    let element = document.getElementById('mensajeAlertaGuardarPedidos');
    element.innerHTML = '';
    this.username = localStorage.getItem('username');
    this.fecha = new Date();
    if (this.tipo === 'GOLD') {
      this.fechaEntrega = this.sumarD(this.fecha, 3);
    }
    if (this.tipo === 'SILVER') {
      this.fechaEntrega = this.sumarD(this.fecha, 7);
    }
    if (this.tipo === 'BRONZE') {
      this.fechaEntrega = this.sumarD(this.fecha, 15);
    }

    console.log(this.pedidito, this.cantidad, this.fecha, this.tipo, this.fechaEntrega, this.username);
    this.dataService.agregarPedido(this.pedidito, this.cantidad, this.fecha, this.tipo, this.fechaEntrega, this.username)
      .subscribe((resultado) => {
      console.log(resultado);
      this._renderer.selectRootElement(this.modal.nativeElement, true).click();
      this.dataService.obtenerPedidos();
      this.pedidito = '';
      this.cantidad = 0;
      this.fecha = null;
      this.tipo = '';
      this.fechaEntrega = null;
      localStorage.removeItem('_id');
    }, (error) => {
      console.log( error );
      if (error.error.mensajeError !== 0) {
        (error.error.mensajeError).forEach(function(mensajeError) {
          element.innerHTML = element.innerHTML + "<div class='alert alert-danger alert-dismissible fade show' role='alert'>" +
          '<strong>' + mensajeError.mensaje + '</strong>' +
          "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
            "<span aria-hidden='true'>&times;</span>" +
          '</button>' +
        '</div>';
        });
      }
    });

  }
  sumarD(fechaEntrega, dias) {
    this.fecha = new Date();
    fechaEntrega.setDate(this.fecha.getDate() + dias);
    return fechaEntrega;
  }

}
