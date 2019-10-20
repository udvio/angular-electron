import { ILogIn } from '../../log-in/log-in.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  constructor(private http: HttpClient) { }
  logInURL = "http://localhost:3000/api/login"

  getAccess(logInInfo: ILogIn){
    console.info(`${LogInService.name}::${this.getAccess.name} -> ${JSON.stringify(logInInfo)}`)

    return this.http.post('http://localhost:3000/api/login', logInInfo).pipe(
      map(authResponse => {
        localStorage.setItem('token', authResponse['token']);
        return true;
      }),
      catchError(error => {
        console.error(`${LogInService.name}::${this.getAccess.name} -> ${JSON.stringify(error)}`)
        return of(false);
      })
      

    )
  }

  isLoggedIn(){
    return !!localStorage.getItem('token')
  }

  
}
