import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListarProductoComponent} from "./components/listar-producto/listar-producto.component";
import {CrearProductoComponent} from "./components/crear-producto/crear-producto.component";

const routes: Routes = [
  { path: '', component: ListarProductoComponent },
  { path: 'create_product', component: CrearProductoComponent },
  { path: 'edit_product/:id', component: CrearProductoComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },//redireciona ala raiz si ecribe una ruta incorrecta
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
