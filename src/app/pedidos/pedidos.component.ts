import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
//import { PedidosModalsComponent } from 'src/app/modals/pedidos/pedidos.component';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  pedidos: any;
  cerebros: any;
  fechaEntrega: Date;
  constructor(private _dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    console.log("Actualizar tabla...");
    this.actualizarTabla();
    if(AppComponent.logged === false){
      this.redirect();
    }
  }

  redirect() {
    this.router.navigate(['login']);
  }
  private static _id: string = '';
  static get id(): string {
    return PedidosComponent._id;
  }
  static set id(value: string) {
    PedidosComponent._id = value;
  }
  private static _tipo: string = '';
  static get tipo(): string {
    return PedidosComponent._tipo;
  }
  static set tipo(value: string) {
    PedidosComponent._tipo = value;
  }
  private static _cantidad: number = null;
  static get cantidad(): number {
    return PedidosComponent._cantidad;
  }
  static set cantidad(value: number) {
    PedidosComponent._cantidad = value;
  }

  private static _fechaEntrega: Date = null;
  static get fechaEntrega(): Date {
    return PedidosComponent._fechaEntrega;
  }
  static set fechaEntrega(value: Date) {
    PedidosComponent._fechaEntrega = value;
  }
  private static _pedidito: string = '';
  static get pedidito(): string {
    return PedidosComponent._pedidito;
  }
  static set pedidito(value: string) {
    PedidosComponent._pedidito = value;
  }

  private static _trigger: boolean = false;
  static get trigger(): boolean {
    return PedidosComponent._trigger;
  }
  static set trigger(value: boolean) {
    PedidosComponent._trigger = value;
  }
  guardarID(id: string) {
    PedidosComponent.id = id;
  }

  actualizarTabla() {
    this._dataService.pedidosObservable
    .subscribe((resultados) => {
      this.pedidos = resultados;
    });
    this._dataService.obtenerPedidos();
  }
}
