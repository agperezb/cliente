import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListarProductoComponent} from "./components/listar-producto/listar-producto.component";
import {CrearProductoComponent} from "./components/crear-producto/crear-producto.component";
import {LoginUserComponent} from "./components/login-user/login-user.component";
import {RegisterUserComponent} from "./components/register-user/register-user.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: LoginUserComponent
  },
  {
    path: 'register',
    component: RegisterUserComponent
  },
  {
    path: 'list_product',
    component: ListarProductoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create_product',
    component: CrearProductoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit_product/:id',
    component: CrearProductoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**', redirectTo: '', pathMatch: 'full'},//redireciona ala raiz si ecribe una ruta incorrecta
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
