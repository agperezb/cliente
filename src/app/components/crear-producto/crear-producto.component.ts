import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Producto} from "../../models/producto";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ProductoService} from "../../services/producto.service";

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss']
})
export class CrearProductoComponent implements OnInit {
  productForm: FormGroup;
  titulo = 'Crear Producto';
  id: string | null;

  constructor(private  fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private _prouctoService: ProductoService,
              private aRouter: ActivatedRoute) {

    this.productForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarProducto(){
    console.log(this.productForm);
    const PRODUCTO: Producto = {
      nombre: this.productForm.get('producto')?.value,
      categoria: this.productForm.get('categoria')?.value,
      ubicacion: this.productForm.get('ubicacion')?.value,
      precio: this.productForm.get('precio')?.value,
    }

    if (this.id !== null){
      this._prouctoService.editarProducto(this.id, PRODUCTO).subscribe(data => {
        this.toastr.success('Producto actualizado exitosamente', 'Producto actualizado');
        this.router.navigate(['/list_product']);
      }, error => {
        this.toastr.error('Tenemos probemas, reintente mas tarde...', 'Error');
      });
    }else {
      this._prouctoService.guardarProducto(PRODUCTO).subscribe(data => {
        this.toastr.success('Producto agregado exitosamente', 'Producto agregado');
        this.router.navigate(['/list_product']);
      }, error => {
        this.toastr.error('Tenemos probemas, reintente mas tarde...', 'Error');
      });
    }
  }

  esEditar() {
    if (this.id !== null){
      this.titulo = 'Editar Producto';
      this._prouctoService.obtenerProducto(this.id).subscribe(data => {
        this.productForm.setValue({
          producto: data.nombre,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio
        });
      });
    }
  }
}
