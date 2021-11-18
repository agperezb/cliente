import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {login} from "../../models/auth";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  registerForm = this.fb.group({
    email: ['', Validators.required],
    password: ['']
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  register() {
    const user: login = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    }
    this.auth.register(user).subscribe( res => {
      localStorage.setItem('token', res.token)
      this.router.navigateByUrl('/list_product').then(r => r);
      console.log(res);
    }, error => {
      console.log(error);
    });
    this.registerForm.reset();
  }
}
