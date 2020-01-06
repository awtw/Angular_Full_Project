import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Setting } from '../shared/setting';


interface AuthResponseData{
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private setting: Setting) { }
  signup(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+this.setting.webkey,{
      email: email,
      password: password,
      returnSecureToken: true
    });


  }
}
