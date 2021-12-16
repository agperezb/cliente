import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { login, register } from "../models/auth";
import {Router} from "@angular/router";

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:4000/api/users';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  login(user: login): Observable<any>{
    console.log(user)
    return this.http.post<any>(`${this.url}/login`, user, httpOptions);
  }

  register(user: register): Observable<any>{
    return this.http.post<any>(`${this.url}/register`, user, httpOptions);
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('');
  }
}
