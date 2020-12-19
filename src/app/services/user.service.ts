import { Injectable } from '@angular/core';
import { Observable, concat } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  host: string = "http://localhost:8080/user";

  loginUri: string = "/login";
  createUserUri: string = "/createUser";
  createAdminUserUri: string = "/createAdminUser";
  userNameAndEmailUri: string = "/userDetails";

  constructor(private http: HttpClient) { }

  getLogin(_email: string, _password: string): Observable<boolean> {
    let finalUrl = String.prototype.concat(this.host, this.loginUri);
    return this.http.get<boolean>(finalUrl, {
      params: {
        userEmail: _email,
        userPassword: _password
      }
    })
  }

  getUserNameAndEmail(_userId: number): Observable<user> {
    let finalUrl = String.prototype.concat(this.host, this.userNameAndEmailUri);
    return this.http.get<user>(finalUrl, {
      params: {
        userId: _userId.toString()
      }
    })
  }

  createUser(_user: user): Observable<number> {
    let finalUrl = String.prototype.concat(this.host, this.createUserUri);
    return this.http.post<number>(finalUrl, _user);
  }

  createAdminUser(_user: user): Observable<number> {
    let finalUrl = String.prototype.concat(this.host, this.createAdminUserUri);
    return this.http.post<number>(finalUrl, _user);
  }
}
