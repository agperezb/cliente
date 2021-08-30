import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Producto} from "../../models/producto";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss']
})
export class CrearProductoComponent implements OnInit {
  productForm: FormGroup;

  constructor(private  fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService) {

    this.productForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  agregarProducto(){
    console.log(this.productForm);
    const PRODUCTO: Producto = {
      nombre: this.productForm.get('producto')?.value,
      categoria: this.productForm.get('categoria')?.value,
      ubicacion: this.productForm.get('ubicacion')?.value,
      precio: this.productForm.get('precio')?.value,
    }
    this.toastr.success('Producto agregado exitosamente', 'Producto agregado');
    this.router.navigate(['/']);
  }
}
