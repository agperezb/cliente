import { Component, OnInit } from '@angular/core';
import {ProductoService} from "../../services/producto.service";
import {Producto} from "../../models/producto";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.scss']
})
export class ListarProductoComponent implements OnInit {
  ListProducts: Producto[] = [];

  constructor(private _productoService: ProductoService,
              private toastr: ToastrService,
              private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this._productoService.getProductos().subscribe(data => {
      console.log(data);
      this.ListProducts = data;
    }, error => {
      console.log(error);
    });
  }

  eliminarProducto(id: any) {
    this._productoService.eliminarProducto(id).subscribe(data => {
      this.toastr.error('El producto fue eliminado exitosamente', 'Producto eliminado');
      this.obtenerProductos();
    },error => {
      console.log(error);
    });
  }

  logout() {
    this.auth.logout();
  }
}
