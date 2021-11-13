import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {login} from "../../models/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent implements OnInit {

  loginForm = this.fb.group({
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

  login() {
    const user: login = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.auth.login(user).subscribe( res => {
      localStorage.setItem('token', res.token)
      this.router.navigateByUrl('/list_product').then(r => r);
      console.log(res);
    }, error => {
      console.log(error);
    });
    this.loginForm.reset();
  }

  register() {

  }
}
