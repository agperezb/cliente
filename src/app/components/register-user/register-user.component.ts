import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import { login, register } from "../../models/auth";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  registerForm = this.fb.group({
    email: ['', Validators.required],
    name: ['', Validators.required],
    password: ['']
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private alert: ToastrService
  ) {
  }

  ngOnInit(): void {
  }

  register() {
    const user: register = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      name: this.registerForm.value.name,
    }
    this.auth.register(user).subscribe( res => {
      localStorage.setItem('token', res.token)
      this.router.navigateByUrl('/list_product').then(r => r);
      this.alert.success('Usuario agregado exitosamente', 'Usuario');
      console.log(res);
    }, error => {
      console.log(error);
      this.alert.success('Error al agregar el usuario', 'Usuario');
    });
    this.registerForm.reset();
  }
}
