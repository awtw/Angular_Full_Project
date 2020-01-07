import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Setting } from '../shared/setting';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


export interface AuthResponseData{
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
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
    }).pipe(catchError(errRes => {
      let errMessage = 'An unknown error occurred';
      if(!errRes.error || !errRes.error.error){
        return throwError(errMessage);
      }
      switch (errRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errMessage = 'This email exists already';
      }
      return throwError(errMessage);
    }));
  }

  login(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+this.setting.webkey, {
      email: email,
      password: password,
      returnSecureToken: true
    })
  }
}
